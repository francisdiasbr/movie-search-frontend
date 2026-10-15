import { Link } from 'react-router-dom';
import React, { useEffect, useState, useRef } from 'react';

import Search from './components/Search';
import { deleteAuthoralReview } from '../reviews/reducer/authoralReviewSlice';
import { fetchAllAuthoralReviews } from '../reviews/reducer/allAuthoralReviewsSlice';
import { deleteFavorite, resetDeleteStatus } from './reducer/movieDetailsSlice';
import { fetchFavorites } from './reducer/favoritesSlice';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import { useToastNotifications } from '../../hooks/useToastNotifications';
import Table from '../../ui/Table';
import { columnData } from './columnData';
import WatchedTag from './components/WatchedTag';

interface MovieEntryRow {
  plot_keywords: string[];
  watched: boolean;
  [key: string]: any;
}

export default function Page() {
  const dispatch = useAppDispatch();
  const { countries, entries, total_documents, status: favoritesStatus, startYears } = useAppSelector((state) => state.moviesFavorites);
  const { deleteStatus } = useAppSelector((state) => state.moviesDetails);
  const { showSuccess, showError, showInfo } = useToastNotifications();
  const [searchTerm, setSearchTerm] = useState('');
  const [country, setCountry] = useState<string | undefined>(undefined);
  const [year, setYear] = useState<number | undefined>(undefined);
  const [watched, setWatched] = useState<boolean | undefined>(undefined);
  const [countryOptions, setCountryOptions] = useState<{ value: string; label: string }[]>([]);
  const [yearOptions, setYearOptions] = useState<{ value: string; label: string }[]>([]);
  const [reviewPaths, setReviewPaths] = useState<Record<string, string | null>>({});
  const lastEntriesKeyRef = useRef<string>('');
  const hasMountedRef = useRef(false);

  const isLoading = favoritesStatus === 'loading';

  const handleSearch = () => {
    dispatch(fetchFavorites({
      filters: {
        country: country && country.trim() !== '' ? country : undefined,
        startYear: year,
        watched: watched,
      },
      searchTerm: searchTerm,
    }));
  };

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }
    if (favoritesStatus !== 'loading') {
      const timeoutId = setTimeout(() => {
        handleSearch();
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [searchTerm, country, year, watched]);

  useEffect(() => {
    setCountryOptions(countries.map((country) => ({ value: country, label: country })));
    setYearOptions(
      startYears.map((year) => ({
        value: year.toString(),
        label: year.toString(),
      }))
    );
  }, [countries, startYears]);

  useEffect(() => {
    if (deleteStatus === 'succeeded') {
      showSuccess({ title: 'Filme removido dos favoritos com sucesso.' });
      dispatch(resetDeleteStatus());
      handleSearch();
    }
    if (deleteStatus === 'failed') {
      showError({ title: 'Não foi possível remover o filme dos favoritos.' });
      dispatch(resetDeleteStatus());
    }
  }, [dispatch, deleteStatus]);

  const handleDelete = async (tconst: string) => {
    await dispatch(deleteFavorite(tconst));
  };

  const handleDeleteReview = async (tconst: string) => {
    try {
      const action = await dispatch(deleteAuthoralReview(tconst));
      if (deleteAuthoralReview.fulfilled.match(action)) {
        showSuccess({ title: 'Resenha deletada com sucesso!' });
        lastEntriesKeyRef.current = '';
        handleSearch();
        return;
      }
      showInfo({ title: 'Nenhuma resenha encontrada para deletar.' });
    } catch (error) {
      showError({ title: 'Erro ao deletar resenha.' });
    }
  };

  useEffect(() => {
    const checkAllReviews = async () => {
      if (entries.length === 0 || favoritesStatus === 'loading') {
        return;
      }

      const currentEntriesKey = entries.map((e: MovieEntryRow) => e.tconst).sort().join(',');

      if (lastEntriesKeyRef.current === currentEntriesKey) {
        return;
      }

      lastEntriesKeyRef.current = currentEntriesKey;

      const tconsts = entries.map((e: MovieEntryRow) => e.tconst);
      const action = await dispatch(fetchAllAuthoralReviews({ filters: { tconst: { $in: tconsts } } }));

      const paths: Record<string, string | null> = {};
      if (fetchAllAuthoralReviews.fulfilled.match(action) && Array.isArray(action.payload)) {
        const reviewedTconsts = new Set(action.payload.map((r: any) => r.tconst));
        entries.forEach((entry: MovieEntryRow) => {
          paths[entry.tconst] = reviewedTconsts.has(entry.tconst) ? `/dashboard/reviews/${entry.tconst}` : null;
        });
      } else {
        entries.forEach((entry: MovieEntryRow) => { paths[entry.tconst] = null; });
      }

      setReviewPaths(paths);
    };

    checkAllReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entries, favoritesStatus, dispatch]);

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
        entries={entries.map((entry: MovieEntryRow) => ({
          ...entry,
          review: reviewPaths[entry.tconst] ? (
            <Link to={reviewPaths[entry.tconst]!} style={{ color: 'blue', textDecoration: 'underline' }}>ver</Link>
          ) : null,
          poster: entry.poster_url ? (
            <img src={entry.poster_url} alt={entry.primaryTitle} width={54} height={80} loading='lazy' style={{ height: '80px', display: 'block', margin: '0 auto' }} />
          ) : null,
          primaryTitle: (
            <Link
              to={`/dashboard/favorites/${entry.tconst}`}
            >
              {entry.primaryTitle}
            </Link>
          ),
          deleteReview: reviewPaths[entry.tconst] ? (
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
