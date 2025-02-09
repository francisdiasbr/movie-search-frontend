'use client';

import { Input, Button } from '@chakra-ui/react';
import Image from 'next/image';
import { useEffect } from 'react';

import { useBlogPosts } from '../../hooks/useBlogPosts';
import * as S from './styles';

export default function BlogPostsPage() {
  const {
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
  } = useBlogPosts();

  useEffect(() => {
    handleSearch();
  }, []);

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
