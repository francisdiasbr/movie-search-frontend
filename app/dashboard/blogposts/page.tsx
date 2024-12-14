'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { Input, Button } from '@chakra-ui/react';

import { createBlogPost } from '../../../lib/features/blogPosts/blogPostsSlice';
import { searchBlogPosts } from '@/lib/features/blogPosts/searchBlogPostsSlice';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import { RootState } from '../../../lib/store';
import * as S from './styles';

export default function BlogPostsPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { data, loading, error } = useAppSelector(
    (state: RootState) => state.searchBlogPost
  );
  const { loading: creating } = useAppSelector(
    (state: RootState) => state.blogPosts
  );
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
  }, [query, dispatch]);

  const handleGeneratePost = async () => {
    if (movieId) {
      try {
        await dispatch(createBlogPost(movieId));
        setMovieId('');
        await handleSearch();
      } catch (error) {
        console.error('Erro ao gerar o post:', error);
      }
    }
  };

  const handleEditPost = async () => {
    if (movieId) {
      router.push(`/dashboard/blogposts/${movieId}/edit`);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const handleCardClick = (tconst: string) => {
    router.push(`/dashboard/blogposts/${tconst}`);
  };

  const entries = data?.entries || [];
  const hasEntries = entries.length > 0;

  return (
    <>
      <div>
        <Input
          type="text"
          value={movieId}
          onChange={(e) => setMovieId(e.target.value)}
          placeholder="Digite o tconst do filme"
          mb={4}
        />
        <Button onClick={handleGeneratePost} isLoading={creating} colorScheme="gray" mr={4}>
          Gerar Post
        </Button>
        <Button onClick={handleEditPost} isLoading={creating} colorScheme="gray">
          Editar Post
        </Button>
      </div>
      {loading && <p>Carregando...</p>}
      {!loading && !hasEntries && <p>Nenhum post encontrado.</p>}
      {!loading && hasEntries && (
        <S.PostsGrid>
          {entries.map(post => (
            <S.StyledCard
              key={`${post.tconst}-${post.title}`}
              onClick={() => handleCardClick(post.tconst)}
            >
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
                  <h3>{post.title}</h3>
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
