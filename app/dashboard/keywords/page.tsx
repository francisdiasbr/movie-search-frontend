'use client';

import { Button, Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import BaseService from '../../../lib/api/service';
import {
  getKeywords,
} from '../../../lib/features/keywords/keywordsSlice';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import FavoriteTag from '../favorites/[tconst]/components/FavoriteTag';

export default function Page() {
  const dispatch = useAppDispatch();
  const {
    data: keywords = [],
    loading,
    error,
  } = useAppSelector(state => state.keywords);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [existingKeywords, setExistingKeywords] = useState<string[]>([]);
  const [suggestedMovies, setSuggestedMovies] = useState<any[]>([]);
  const [loadingMovies, setLoadingMovies] = useState(false);

  useEffect(() => {
    dispatch(getKeywords()).then(action => {
      if (getKeywords.fulfilled.match(action)) {
        setExistingKeywords(action.payload.map((kw: any) => kw.keyword));
      }
    });
  }, [dispatch]);

  const handleKeywordClick = async (keyword: string) => {
    let updatedSelected;
    if (selectedKeywords.includes(keyword)) {
      updatedSelected = selectedKeywords.filter(kw => kw !== keyword);
    } else {
      updatedSelected = [...selectedKeywords, keyword];
    }
    setSelectedKeywords(updatedSelected);
  };

  const handleFetchMovies = async () => {
    if (selectedKeywords.length === 0) return;
    setLoadingMovies(true);
    setSuggestedMovies([]);
    try {
      const data = await BaseService.post('keywords/suggest-movies', { keywords: selectedKeywords });
      setSuggestedMovies(data?.data?.movies || []);
    } catch (error) {
      setSuggestedMovies([]);
    } finally {
      setLoadingMovies(false);
    }
  };

  return (
    <div>
      <h2>Palavras-chave</h2>
      <p>Selecione as palavras-chave que você deseja usar para descobrir novos filmes!</p>
      {loading && <div>Carregando...</div>}
      {error && <div>Error: {error}</div>}
      {!loading && !error && (
        <FavoriteTag
          items={Array.isArray(keywords) ? keywords.map(kw => kw.keyword) : []}
          onItemClick={handleKeywordClick}
          isSelected={selectedKeywords}
          existingItems={existingKeywords}
        />
      )}
      <Box mt={4} display="flex" gap={2}>
        <Button
          colorScheme="neutral"
          onClick={handleFetchMovies}
          isDisabled={loadingMovies}
          isLoading={loadingMovies}
          spinnerPlacement='end'
          loadingText='Buscando filmes'
        >
          Buscar filmes
        </Button>
        <Button
          colorScheme="gray"
          onClick={() => setSelectedKeywords([])}
          isDisabled={loadingMovies}
          spinnerPlacement='end'
          loadingText='Limpar seleção'
        >
          Limpar seleção
        </Button>
      </Box>
      <Box mt={6}>
        {suggestedMovies.length > 0 && (
          <div>
            <h3>Filmes sugeridos:</h3>
            <ul>
              {suggestedMovies.map((movie, index) => (
                <li key={index}>
                  <strong>{movie.title}</strong> ({movie.year})<br />
                  <em>{movie.description}</em>
                  {movie.relevance && (
                    <div style={{ fontSize: '0.9em', color: '#666' }}>{movie.relevance}</div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Box>
    </div>
  );
}
