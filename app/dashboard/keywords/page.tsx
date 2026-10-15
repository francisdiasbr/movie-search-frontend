import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import { useAsyncAction } from '../../hooks/useAsyncAction';
import Button from '../../ui/Button';
import { Row } from '../../ui/Layout';
import PageHeader from '../../ui/PageHeader';
import FavoriteTag from '../favorites/[tconst]/components/FavoriteTag';
import { getKeywords } from './reducer/keywordsSlice';
import keywordsService from './service/KeywordsService';
import * as S from './styles';
import { SuggestedMovie } from './types';

export default function Page() {
  const dispatch = useAppDispatch();
  const { data: keywords = [], status, error } = useAppSelector(state => state.keywords);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [existingKeywords, setExistingKeywords] = useState<string[]>([]);
  const [suggestedMovies, setSuggestedMovies] = useState<SuggestedMovie[]>([]);

  const loading = status === 'loading';

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

  const { loading: loadingMovies, run: handleFetchMovies } = useAsyncAction(async () => {
    if (selectedKeywords.length === 0) return;
    setSuggestedMovies([]);
    try {
      const response = await keywordsService.suggestMovies(selectedKeywords);
      setSuggestedMovies(response?.data?.movies ?? []);
    } catch {
      setSuggestedMovies([]);
    }
  });

  return (
    <div>
      <PageHeader
        title='Palavras-chave'
        description='Selecione as palavras-chave que você deseja usar para descobrir novos filmes!'
      />
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
      <Row $mt='md'>
        <Button onClick={() => handleFetchMovies()} disabled={selectedKeywords.length === 0} loading={loadingMovies}>
          Buscar filmes
        </Button>
        <Button variant='outline' onClick={() => setSelectedKeywords([])} disabled={loadingMovies}>
          Limpar seleção
        </Button>
      </Row>
      {suggestedMovies.length > 0 && (
        <S.Results>
          <h3>Filmes sugeridos:</h3>
          <ul>
            {suggestedMovies.map((movie, index) => (
              <li key={index}>
                <strong>{movie.title}</strong> ({movie.year})<br />
                <em>{movie.description}</em>
                {movie.relevance && <S.Relevance>{movie.relevance}</S.Relevance>}
              </li>
            ))}
          </ul>
        </S.Results>
      )}
    </div>
  );
}
