import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useCallback, useState, useEffect } from 'react';

import {
  clearAuthoralReviewStatus,
  fetchAllAuthoralReviews,
} from '../../lib/features/allAuthoralReviews/allAuthoralReviewsSlice';
import { createBlogPost } from '../../lib/features/blogPosts/blogPostsSlice';
import { clearSearchState, searchBlogPosts } from '../../lib/features/blogPosts/searchBlogPostsSlice';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { RootState } from '../../lib/store';

export function useBlogPosts() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const toast = useToast();

  const { data, loading } = useAppSelector((state: RootState) => state.searchBlogPost);
  const { entries: allAuthoralReviews } = useAppSelector((state: RootState) => state.allAuthoralReviews);
  const { loading: creating } = useAppSelector((state: RootState) => state.blogPosts);
  const [query, setQuery] = useState('');
  const [movieId, setMovieId] = useState('');

  useEffect(() => {
    dispatch(clearSearchState());
    dispatch(clearAuthoralReviewStatus());
    return () => {
      dispatch(clearSearchState());
      dispatch(clearAuthoralReviewStatus());
    };
  }, [dispatch]);

  const handleSearch = useCallback(async () => {
    try {
      dispatch(clearSearchState());
      await dispatch(searchBlogPosts({}));
      await dispatch(fetchAllAuthoralReviews({ page: 1, pageSize: 50 }));
    } catch (error) {
      console.error('Erro ao buscar posts:', error);
    }
  }, [dispatch]);

  const handleGeneratePost = async () => {
    if (!movieId) {
      toast({
        title: 'Campo vazio',
        description: 'Por favor, insira o tconst do filme antes de gerar um post.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      await dispatch(createBlogPost(movieId));
      setMovieId('');
      await handleSearch();
    } catch (error) {
      console.error('Erro ao gerar o post:', error);
    }
  };

  const handleEditPost = async () => {
    if (!movieId) {
      toast({
        title: 'Campo vazio',
        description: 'Por favor, insira o tconst do filme antes de editar um post.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    router.push(`/dashboard/blogposts/${movieId}/edit`);
  };

  const handleCardClick = (tconst: string) => {
    const post = allEntries.find((entry) => entry.tconst === tconst);
    if (post && post.isAiGenerated === false) {
      router.push(`/dashboard/reviews/${tconst}`);
    } else {
      router.push(`/dashboard/blogposts/${tconst}`);
    }
  };

  const blogPostEntries = data?.entries || [];
  const authoralReviewEntries = allAuthoralReviews || [];
  const allEntries = [...blogPostEntries, ...authoralReviewEntries];
  const hasEntries = allEntries.length > 0;

  return {
    loading,
    creating,
    movieId,
    setMovieId,
    hasEntries,
    allEntries,
    handleSearch,
    handleGeneratePost,
    handleEditPost,
    handleCardClick,
  };
}
