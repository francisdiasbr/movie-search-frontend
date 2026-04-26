import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import React, { useEffect, useState, useRef } from 'react';

import Search from '../../../app/ui/Search';
import { deleteAuthoralReview, fetchAuthoralReview } from '../../../lib/features/authoralReview/authoralReviewSlice';
import { deleteFavorite, resetDeleteStatus } from '../../../lib/features/movie/movieDetailsSlice';
import { fetchFavorites } from '../../../lib/features/movies/movieFavoritesSlice';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import Table from '../../ui/table';
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
  const { editStatus, deleteStatus } = useAppSelector((state) => state.moviesDetails);
  const [searchTerm, setSearchTerm] = useState('');
  const [country, setCountry] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [year, setYear] = useState<number | undefined>(undefined);
  const [watched, setWatched] = useState<boolean | undefined>(undefined);
  const [countryOptions, setCountryOptions] = useState<{ value: string; label: string }[]>([]);
  const [yearOptions, setYearOptions] = useState<{ value: string; label: string }[]>([]);
  const [reviewPaths, setReviewPaths] = useState<Record<string, string | null>>({});
  const [isCheckingReviews, setIsCheckingReviews] = useState(false);
  const lastEntriesKeyRef = useRef<string>('');

  const isLoading = favoritesStatus === 'loading' || editStatus === 'loading' || deleteStatus === 'loading' || isCheckingReviews;

  const handleSearch = (currentPage = page, currentPageSize = pageSize) => {
    const params = {
      filters: {
        country: country && country.trim() !== '' ? country : undefined,
        startYear: year,
        watched: watched,
      },
      page: currentPage + 1,
      pageSize: currentPageSize,
      searchTerm: searchTerm,
    };
    dispatch(fetchFavorites(params));
  };

  useEffect(() => {
    handleSearch(0, pageSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (favoritesStatus !== 'loading') {
      const timeoutId = setTimeout(() => {
        setPage(0);
        handleSearch(0, pageSize);
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

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(0);
    handleSearch(0, newPageSize);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    handleSearch(newPage, pageSize);
  };

  useEffect(() => {
    if (deleteStatus === 'succeeded') {
      toast.success('Filme removido dos favoritos com sucesso.');
      dispatch(resetDeleteStatus());
      handleSearch();
    }
    if (deleteStatus === 'failed') {
      toast.error('Não foi possível remover o filme dos favoritos.');
      dispatch(resetDeleteStatus());
    }
  }, [dispatch, toast, deleteStatus]);

  const handleDelete = async (tconst: string) => {
    await dispatch(deleteFavorite(tconst));
  };

  const handleDeleteReview = async (tconst: string) => {
    try {
      const action = await dispatch(deleteAuthoralReview(tconst));
      if (deleteAuthoralReview.fulfilled.match(action)) {
        toast.success('Resenha deletada com sucesso!');
        lastEntriesKeyRef.current = '';
        handleSearch();
        return;
      }
      toast.info('Nenhuma resenha encontrada para deletar.');
    } catch (error) {
      toast.error('Erro ao deletar resenha.');
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
      setIsCheckingReviews(true);
      const paths: Record<string, string | null> = {};

      await Promise.all(entries.map(async (entry: MovieEntryRow) => {
        try {
          const action = await dispatch(fetchAuthoralReview(entry.tconst));
          paths[entry.tconst] = fetchAuthoralReview.fulfilled.match(action) && action.payload
            ? `/dashboard/reviews/${entry.tconst}`
            : null;
        } catch {
          paths[entry.tconst] = null;
        }
      }));

      setReviewPaths(paths);
      setIsCheckingReviews(false);
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
        isActionLoading={editStatus === 'loading' || deleteStatus === 'loading'}
        isLoading={isLoading}
        totalDocuments={total_documents}
      />
    </>
  );
}
