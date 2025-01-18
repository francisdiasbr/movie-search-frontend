'use client';

import { Input, Button, useToast } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { fetchAllAuthoralReviews } from '../../../lib/features/allAuthoralReviews/allAuthoralReviewsSlice';
import { createBlogPost } from '../../../lib/features/blogPosts/blogPostsSlice';
import { searchBlogPosts } from '../../../lib/features/blogPosts/searchBlogPostsSlice';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import { RootState } from '../../../lib/store';
import * as S from './styles';

export default function BlogPostsPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const toast = useToast();

  const { data, loading, error } = useAppSelector((state: RootState) => state.searchBlogPost);
  const { entries: allAuthoralReviews } = useAppSelector((state: RootState) => state.allAuthoralReviews);
  const { loading: creating } = useAppSelector((state: RootState) => state.blogPosts);
  const [query, setQuery] = useState('');
  const [movieId, setMovieId] = useState('');

  const handleSearch = useCallback(async () => {
    console.log('Texto digitado:', query);
    console.log('Texto após trim:', query.trim());

    const params = {
      filters: query.trim()
        ? {
            $or: [
              { title: { $regex: query.trim(), $options: 'i' } },
              { primaryTitle: { $regex: query.trim(), $options: 'i' } },
              { introduction: { $regex: query.trim(), $options: 'i' } },
            ],
          }
        : {},
    };
    console.log('Parâmetros enviados para API:', params);

    await dispatch(searchBlogPosts(params));
    dispatch(fetchAllAuthoralReviews({ page: 1, pageSize: 50 }));
  }, [query, dispatch]);

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

  useEffect(() => {
    handleSearch();
    dispatch(fetchAllAuthoralReviews({ page: 1, pageSize: 50 }));
  }, []);

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

  return (
    <>
      <h2>Blog Posts</h2>
      <div>
        <p>Gere ou edite um post</p>
        <Input
          type='text'
          value={movieId}
          onChange={(e) => setMovieId(e.target.value)}
          placeholder='Digite o tconst do filme'
          mb={4}
        />
        <Button onClick={handleGeneratePost} isLoading={creating} colorScheme='gray' mr={4}>
          Gerar Post
        </Button>
        <Button onClick={handleEditPost} isLoading={creating} colorScheme='gray'>
          Editar Post
        </Button>
      </div>
      {loading && <p>Carregando...</p>}
      {!loading && !hasEntries && <p>Nenhum post encontrado.</p>}
      {!loading && hasEntries && (
        <S.PostsGrid>
          {allEntries.map((post) => (
            <S.StyledCard key={`${post.tconst}-${post.primaryTitle}`} onClick={() => handleCardClick(post.tconst)}>
              <S.CardContent>
                <S.CardHeader>
                  <Image
                    src='https://github.com/francisdiasbr.png'
                    alt='Francis Dias'
                    width={40}
                    height={40}
                    style={{
                      borderRadius: '50%',
                    }}
                  />
                  <h3>{post.primaryTitle}</h3>
                  <p>{post.tconst}</p>
                </S.CardHeader>
                <S.CardDate>{post.created_at}</S.CardDate>
              </S.CardContent>
            </S.StyledCard>
          ))}
        </S.PostsGrid>
      )}
    </>
  );
}
