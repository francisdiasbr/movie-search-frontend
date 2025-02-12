'use client';

import { Input, Button } from '@chakra-ui/react';
import { useEffect } from 'react';
import { FaStar } from 'react-icons/fa';

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
    const fetchData = async () => {
      await handleSearch();
    };
    fetchData();
  }, [handleSearch]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh' }}>
        <h2>Blog Posts</h2>
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      <h2>Blog Posts</h2>
      <div>
        <p>Gere ou edite um post feito com IA</p>
        <Input
          type='text'
          value={movieId}
          onChange={(e) => setMovieId(e.target.value)}
          placeholder='Digite o tconst do filme'
          mb={4}
        />
        <Button onClick={handleGeneratePost} isLoading={creating} colorScheme='gray' mr={4} isDisabled={loading}>
          Gerar Post
        </Button>
        <Button onClick={handleEditPost} isLoading={creating} colorScheme='gray' isDisabled={loading}>
          Editar Post
        </Button>
      </div>

      {!hasEntries ? (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <p>Nenhum post encontrado.</p>
        </div>
      ) : (
        <S.PostsList>
          {allEntries.map((post) => (
            <S.ListItem key={`${post.tconst}-${post.primaryTitle}`} onClick={() => handleCardClick(post.tconst)}>
              <div style={{ display: 'flex', alignItems: 'center' }}  >
                <span style={{ marginRight: '8px' }}>{post.isAiGenerated ? '✨' : '🖋️'}</span>
                <span>{post.primaryTitle}</span>
              </div>
              <span>{post.tconst}</span>
          </S.ListItem>
          ))}
        </S.PostsList>
      )}
    </div>
  );
}
