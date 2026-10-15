import { Link } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';

import Search from './components/Search';
import { deleteFavorite, resetDeleteStatus } from './reducer/movieDetailsSlice';
import { fetchFavorites } from './reducer/favoritesSlice';
import favoritesService from './service/FavoritesService';
import { isApiError } from '../../../lib/api/errors';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import { ROUTES } from '../../const';
import { useDebouncedEffect } from '../../hooks/useDebouncedEffect';
import { useStatusToast } from '../../hooks/useStatusToast';
import { useToastNotifications } from '../../hooks/useToastNotifications';
import Table from '../../ui/Table';
import { toSelectOptions } from '../../util/select';
import { columnData } from './columnData';
import WatchedTag from './components/WatchedTag';

export default function Page() {
  const dispatch = useAppDispatch();
  const { countries, entries, total_documents, status: favoritesStatus, startYears } = useAppSelector((state) => state.moviesFavorites);
  const { deleteStatus } = useAppSelector((state) => state.moviesDetails);
  const { showSuccess, showError, showInfo } = useToastNotifications();
  const [searchTerm, setSearchTerm] = useState('');
  const [country, setCountry] = useState<string | undefined>(undefined);
  const [year, setYear] = useState<number | undefined>(undefined);
  const [watched, setWatched] = useState<boolean | undefined>(undefined);

  const isLoading = favoritesStatus === 'loading';

  const handleSearch = () => {
    dispatch(fetchFavorites({
      filters: {
        country: country || undefined,
        startYear: year,
        watched,
      },
      searchTerm,
    }));
  };

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useDebouncedEffect(handleSearch, [searchTerm, country, year, watched]);

  const countryOptions = useMemo(() => toSelectOptions(countries), [countries]);
  const yearOptions = useMemo(() => toSelectOptions(startYears), [startYears]);

  useStatusToast({
    errorMessage: 'Não foi possível remover o filme dos favoritos.',
    onSuccess: handleSearch,
    reset: () => dispatch(resetDeleteStatus()),
    status: deleteStatus,
    successMessage: 'Filme removido dos favoritos com sucesso.',
  });

  const handleDelete = async (tconst: string) => {
    await dispatch(deleteFavorite(tconst));
  };

  const handleDeleteReview = async (tconst: string) => {
    try {
      await favoritesService.removeReview(tconst);
      showSuccess({ title: 'Resenha deletada com sucesso!' });
      handleSearch();
    } catch (error) {
      if (isApiError(error) && error.status === 404) {
        showInfo({ title: 'Nenhuma resenha encontrada para deletar.' });
        return;
      }
      showError({ title: 'Erro ao deletar resenha.' });
    }
  };

  return (
    <>
      <h2>Favoritos</h2>
      <Search
        country={country ?? ''}
        countryOptions={countryOptions}
        isLoading={isLoading}
        searchTerm={searchTerm}
        setCountry={setCountry}
        setSearchTerm={setSearchTerm}
        setWatched={setWatched}
        setYear={setYear}
        showAllFields
        watched={watched}
        year={year}
        yearOptions={yearOptions}
      />
      <Table
        columns={columnData}
        entries={entries.map(entry => ({
          ...entry,
          review: entry.hasReview ? <Link to={ROUTES.review(entry.tconst)}>ver</Link> : null,
          poster: entry.poster_url ? (
            <img src={entry.poster_url} alt={entry.primaryTitle} width={54} height={80} loading='lazy' style={{ height: '80px', display: 'block', margin: '0 auto' }} />
          ) : null,
          primaryTitle: (
            <Link to={ROUTES.favorite(entry.tconst)}>
              {entry.primaryTitle}
            </Link>
          ),
          deleteReview: entry.hasReview ? (
            <button
              onClick={() => handleDeleteReview(entry.tconst)}
              title='Deletar review'
              style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
            >
              x
            </button>
          ) : null,
          watched: <WatchedTag tconst={entry.tconst} watched={entry.watched} onUpdate={handleSearch} />,
        }))}
        handleDelete={handleDelete}
        isLoading={isLoading}
        totalDocuments={total_documents}
      />
    </>
  );
}
