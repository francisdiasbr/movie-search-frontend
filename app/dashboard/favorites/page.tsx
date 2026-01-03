'use client';

import { useToast, IconButton } from '@chakra-ui/react';
import Link from 'next/link';
import React, { useEffect, useState, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';

import Search from '../../../app/ui/Search';
import { fetchBlogPost, deleteBlogPost } from '../../../lib/features/blogPosts/blogPostsSlice';
import { deleteFavorite, resetDeleteStatus } from '../../../lib/features/movie/movieDetailsSlice';
import { fetchFavorites } from '../../../lib/features/movies/movieFavoritesSlice';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import Table from '../../ui/Table';
import { columnData } from './columnData';
import KeywordTags from './components/KeywordTags';
import ReviewLink from './components/ReviewLink';
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
  const toast = useToast();

  const [searchTerm, setSearchTerm] = useState('');
  const [country, setCountry] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [year, setYear] = useState<number | undefined>(undefined);
  const [watched, setWatched] = useState<boolean | undefined>(undefined);
  const [countryOptions, setCountryOptions] = useState<{ value: string; label: string }[]>([]);
  const [yearOptions, setYearOptions] = useState<{ value: string; label: string }[]>([]);
  const [reviewPaths, setReviewPaths] = useState<Record<string, string | null>>(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('favorites-reviewPaths');
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          return {};
        }
      }
    }
    return {};
  });
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
    if (entries.length === 0 && favoritesStatus === 'idle') {
      handleSearch(0, pageSize);
    }
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
      toast({
        title: 'Success',
        description: 'Filme removido dos favoritos com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      dispatch(resetDeleteStatus());
      handleSearch();
    }
    if (deleteStatus === 'failed') {
      toast({
        title: 'Erro',
        description: 'Não foi possível remover o filme dos favoritos.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        variant: 'top-accent',
      });
      dispatch(resetDeleteStatus());
    }
  }, [dispatch, toast, deleteStatus]);

  const handleDelete = async (tconst: string) => {
    await dispatch(deleteFavorite(tconst));
  };

  const handleDeleteReview = async (tconst: string) => {
    try {
      const blogAction = await dispatch(deleteBlogPost(tconst));
      if (deleteBlogPost.fulfilled.match(blogAction)) {
        toast({ title: 'Blogpost deletado com sucesso!', status: 'success' });
        const currentPaths = { ...reviewPaths };
        delete currentPaths[tconst];
        setReviewPaths(currentPaths);
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('favorites-reviewPaths', JSON.stringify(currentPaths));
        }
        handleSearch();
        return;
      }

      toast({ title: 'Nenhuma review encontrada para deletar.', status: 'info' });
    } catch (error) {
      console.error('Erro ao deletar review:', error);
      toast({ title: 'Erro ao deletar review.', status: 'error' });
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

      const allEntriesHavePaths = entries.every((entry: MovieEntryRow) => entry.tconst in reviewPaths);
      if (allEntriesHavePaths && Object.keys(reviewPaths).length > 0) {
        lastEntriesKeyRef.current = currentEntriesKey;
        return;
      }

      lastEntriesKeyRef.current = currentEntriesKey;

      setIsCheckingReviews(true);
      const paths: Record<string, string | null> = {};

      const reviewChecks = entries.map(async (entry: MovieEntryRow) => {
        try {
          const blogAction = await dispatch(fetchBlogPost(entry.tconst));
          if (fetchBlogPost.fulfilled.match(blogAction) && blogAction.payload) {
            paths[entry.tconst] = `/dashboard/blogposts/${entry.tconst}`;
            return;
          }

          paths[entry.tconst] = null;
        } catch (error) {
          paths[entry.tconst] = null;
        }
      });

      await Promise.all(reviewChecks);
      setReviewPaths(paths);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('favorites-reviewPaths', JSON.stringify(paths));
      }
      setIsCheckingReviews(false);
    };

    checkAllReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entries, favoritesStatus, dispatch]);

  return (
    <>
      <h2>Favoritos</h2>
      <Search
        isLoading={isLoading}
        isFavoritePage
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        country={country ?? ''}
        setCountry={setCountry}
        showAllFields
        setYear={setYear}
        year={year}
        countryOptions={countryOptions}
        yearOptions={yearOptions}
        watched={watched}
        setWatched={setWatched}
      />
      <Table
        columns={columnData}
        entries={entries.map((entry: MovieEntryRow) => ({
          ...entry,
          plot_keywords: <KeywordTags keywords={entry.plot_keywords} />,
          review: reviewPaths[entry.tconst] ? (
            <ReviewLink tconst={entry.tconst} reviewPath={reviewPaths[entry.tconst]} />
          ) : null,
          primaryTitle: (
            <Link
              href={`/dashboard/favorites/${entry.tconst}`}
              style={{
                color: '#3182ce',
                textDecoration: 'underline',
              }}
            >
              {entry.primaryTitle}
            </Link>
          ),
          deleteReview: reviewPaths[entry.tconst] ? (
            <IconButton
              aria-label="Deletar review"
              icon={<FaTimes />}
              onClick={() => handleDeleteReview(entry.tconst)}
              size="sm"
              colorScheme="red"
              variant="ghost"
              _hover={{
                transform: 'scale(1.1)',
                color: 'red.500',
              }}
              transition="all 0.2s"
            />
          ) : null,
          watched: <WatchedTag tconst={entry.tconst} watched={entry.watched} onUpdate={handleSearch} />,
        }))}
        isLoading={isLoading}
        isActionLoading={editStatus === 'loading' || deleteStatus === 'loading'}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        handleDelete={handleDelete}
        handleWatchedUpdate={handleSearch}
        page={page}
        pageSize={pageSize}
        totalDocuments={total_documents}
      />
    </>
  );
}
