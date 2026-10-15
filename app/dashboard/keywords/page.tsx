import { useEffect, useState } from 'react';

import { useAsyncAction } from '../../hooks/useAsyncAction';
import Button from '../../ui/Button';
import { Row } from '../../ui/Layout';
import LoadingSpinner from '../../ui/LoadingSpinner';
import PageHeader from '../../ui/PageHeader';
import TagList from '../../ui/TagList';
import keywordsService from './service/KeywordsService';
import * as S from './styles';
import { SuggestedMovie } from './types';
import { useKeywords } from './useKeywords';

export default function Page() {
  const { keywords, load, status } = useKeywords();
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [suggestedMovies, setSuggestedMovies] = useState<SuggestedMovie[]>([]);

  useEffect(() => {
    load();
  }, [load]);

  const toggleKeyword = (keyword: string) => {
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
      {status === 'loading' && <LoadingSpinner />}
      {status === 'failed' && <p>Não foi possível carregar as palavras-chave.</p>}
      {status === 'succeeded' && (
        <TagList items={keywords} onSelect={toggleKeyword} selected={selectedKeywords} />
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
