import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import FavoriteTag from '../favorites/[tconst]/components/FavoriteTag';
import { getKeywords } from './reducer/keywordsSlice';
import keywordsService from './service/KeywordsService';
import * as S from './styles';
import { SuggestedMovie } from './types';

export default function Page() {
  const dispatch = useAppDispatch();
  const { data: keywords = [], status, error } = useAppSelector(state => state.keywords);
  const loading = status === 'loading';
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [existingKeywords, setExistingKeywords] = useState<string[]>([]);
  const [suggestedMovies, setSuggestedMovies] = useState<SuggestedMovie[]>([]);
  const [loadingMovies, setLoadingMovies] = useState(false);

  useEffect(() => {
    dispatch(getKeywords()).then(action => {
      if (getKeywords.fulfilled.match(action)) {
        setExistingKeywords(action.payload.map(kw => kw.keyword));
      }
    });
  }, [dispatch]);

  const handleKeywordClick = (keyword: string) => {
    setSelectedKeywords(prev =>
      prev.includes(keyword) ? prev.filter(kw => kw !== keyword) : [...prev, keyword]
    );
  };

  const handleFetchMovies = async () => {
    if (selectedKeywords.length === 0) return;
    setLoadingMovies(true);
    setSuggestedMovies([]);
    try {
      const response = await keywordsService.suggestMovies(selectedKeywords);
      setSuggestedMovies(response?.data?.movies ?? []);
    } catch {
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
          existingItems={existingKeywords}
          isSelected={selectedKeywords}
          items={Array.isArray(keywords) ? keywords.map(kw => kw.keyword) : []}
          onItemClick={handleKeywordClick}
        />
      )}
      <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
        <button onClick={handleFetchMovies} disabled={loadingMovies}>
          {loadingMovies ? 'Adicionando' : 'Buscar filmes'}
        </button>
        <button onClick={() => setSelectedKeywords([])} disabled={loadingMovies}>
          Limpar seleção
        </button>
      </div>
      {suggestedMovies.length > 0 && (
        <div style={{ marginTop: '24px' }}>
          <h3>Filmes sugeridos:</h3>
          <ul>
            {suggestedMovies.map((movie, index) => (
              <li key={index}>
                <strong>{movie.title}</strong> ({movie.year})<br />
                <em>{movie.description}</em>
                {movie.relevance && (
                  <S.Relevance>{movie.relevance}</S.Relevance>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
