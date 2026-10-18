import { useEffect, useState } from 'react';

import { isApiError } from '../../../lib/api/errors';
import { useAsyncAction } from '../../hooks/useAsyncAction';
import { useToastNotifications } from '../../hooks/useToastNotifications';
import Button from '../../ui/Button';
import { Row } from '../../ui/Layout';
import LoadingSpinner from '../../ui/LoadingSpinner';
import PageHeader from '../../ui/PageHeader';
import TagList from '../../ui/TagList';
import SuggestedMovieCard from './components/SuggestedMovieCard';
import keywordsService from './service/KeywordsService';
import * as S from './styles';
import { SuggestedMovie } from './types';
import { useKeywords } from './useKeywords';

export default function Page() {
  const { keywords, load, refresh, status } = useKeywords();
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [suggestedMovies, setSuggestedMovies] = useState<SuggestedMovie[] | null>(null);
  // Suggestions already in the collection show a filled star.
  const [collectedTconsts, setCollectedTconsts] = useState<Set<string>>(new Set());
  const [addingTconst, setAddingTconst] = useState<string | null>(null);
  const { showError, showInfo, showSuccess } = useToastNotifications();

  useEffect(() => {
    load();
  }, [load]);

  // Keywords are favourited from the movie page, often in another tab, so the
  // list is refreshed whenever this tab comes back to the front.
  useEffect(() => {
    const handleVisible = () => {
      if (document.visibilityState === 'visible') refresh();
    };
    window.addEventListener('focus', refresh);
    document.addEventListener('visibilitychange', handleVisible);
    return () => {
      window.removeEventListener('focus', refresh);
      document.removeEventListener('visibilitychange', handleVisible);
    };
  }, [refresh]);

  const toggleKeyword = (keyword: string) => {
    setSelectedKeywords(prev =>
      prev.includes(keyword) ? prev.filter(kw => kw !== keyword) : [...prev, keyword]
    );
  };

  const { loading: loadingMovies, run: handleFetchMovies } = useAsyncAction(async () => {
    if (selectedKeywords.length === 0) return;
    setSuggestedMovies(null);
    try {
      const response = await keywordsService.suggestMovies(selectedKeywords);
      const movies = response?.data?.movies ?? [];
      setSuggestedMovies(movies);
      setCollectedTconsts(
        await keywordsService.findCollectedTconsts(movies.map(movie => movie.tconst)).catch(() => new Set<string>())
      );
    } catch {
      setSuggestedMovies([]);
    }
  });

  const markCollected = (tconst: string) => setCollectedTconsts(prev => new Set(prev).add(tconst));

  const handleAddToCollection = async (tconst: string) => {
    if (addingTconst) return;
    setAddingTconst(tconst);
    try {
      await keywordsService.addToCollection(tconst);
      markCollected(tconst);
      showSuccess({ title: 'Filme adicionado na coleção.' });
    } catch (error) {
      if (isApiError(error) && error.status === 409) {
        markCollected(tconst);
        showInfo({ title: 'Este filme já está na coleção.' });
        return;
      }
      showError({ title: 'Não foi possível adicionar o filme na coleção.' });
    } finally {
      setAddingTconst(null);
    }
  };

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
      {suggestedMovies && suggestedMovies.length === 0 && (
        <S.Results>Nenhum filme encontrado no IMDb para essas palavras-chave. Tente de novo ou mude a seleção.</S.Results>
      )}
      {suggestedMovies && suggestedMovies.length > 0 && (
        <S.Results>
          <h3>Filmes sugeridos:</h3>
          <S.List>
            {suggestedMovies.map(movie => (
              <SuggestedMovieCard
                collected={collectedTconsts.has(movie.tconst)}
                key={movie.tconst}
                loading={addingTconst === movie.tconst}
                movie={movie}
                onCollect={handleAddToCollection}
              />
            ))}
          </S.List>
        </S.Results>
      )}
    </div>
  );
}
