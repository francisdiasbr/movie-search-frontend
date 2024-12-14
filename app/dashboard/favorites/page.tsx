'use client';

import { Text, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import Search from '../../../app/ui/Search';
import {
  deleteFavorite,
  resetDeleteStatus,
} from '../../../lib/features/movie/movieDetailsSlice';
import { fetchFavorites } from '../../../lib/features/movies/movieFavoritesSlice';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import Table from '../../ui/Table';
import { columnData } from './columnData';
import KeywordTags from './components/KeywordTags';

interface MovieEntry {
  plot_keywords: string[];
  watched: boolean;
  [key: string]: any;
}

function truncatePlotKeywords(keywords: string[]): string[] {
  return keywords.slice(0, 5);
}

export default function Page() {
  const dispatch = useAppDispatch();
  const { countries, entries, total_documents, status, startYears } =
    useAppSelector(state => state.moviesFavorites);
  const { delStatus } = useAppSelector(state => state.moviesDetails);
  const toast = useToast();

  const [searchTerm, setSearchTerm] = useState('');
  const [country, setCountry] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [year, setYear] = useState<number | undefined>(undefined);
  const [countryOptions, setCountryOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [yearOptions, setYearOptions] = useState<
    { value: string; label: string }[]
  >([]);

  const handleSearch = (currentPage = page, currentPageSize = pageSize) => {
    const params = {
      filters: {
        country: country,
        startYear: year,
      },
      page: currentPage + 1,
      pageSize: currentPageSize,
      searchTerm: searchTerm,
    };
    dispatch(fetchFavorites(params));
  };

  const handleDelete = (tconst: string) => {
    dispatch(deleteFavorite(tconst));
  };

  useEffect(() => {
    handleSearch();
  }, []);

  useEffect(() => {
    setCountryOptions(
      countries.map(country => ({ value: country, label: country }))
    );
    setYearOptions(
      startYears.map(year => ({
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
    if (delStatus === 'succeeded') {
      toast({
        title: 'Success',
        description: 'Movie removed from favs.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      dispatch(resetDeleteStatus());
      handleSearch();
    }
    if (delStatus === 'failed') {
      toast({
        title: 'Erro ao atualizar',
        description: 'Não foi possível atualizar os detalhes do filme',
        status: 'error',
        duration: 3000,
        isClosable: true,
        variant: 'top-accent',
      });
    }
    if (delStatus === 'succeeded' || delStatus === 'failed') {
      dispatch(resetDeleteStatus());
    }
  }, [delStatus, dispatch, toast]);

  // Log dos dados que chegam na tabela
  useEffect(() => {
    console.log('Entries:', entries); // Log das entradas
    console.log('Total Documents:', total_documents); // Log do total de documentos
  }, [entries, total_documents]);

  return (
    <>
      <Text fontSize='2xl' as='b'>Favoritos</Text>
      <br />
      <br />
      <Search
        isLoading={status === 'loading'}
        isFavoritePage
        handleSearch={handleSearch}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        country={country ?? ''}
        setCountry={setCountry}
        showAllFields
        setYear={setYear}
        year={year}
        countryOptions={countryOptions}
        yearOptions={yearOptions}
      />
      <Table
        columns={columnData}
        entries={entries.map((entry: MovieEntry) => ({
          ...entry,
          plot_keywords: <KeywordTags keywords={entry.plot_keywords} />,
        }))}
        isLoading={status === 'loading'}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        page={page}
        pageSize={pageSize}
        totalDocuments={total_documents}
        handleDelete={handleDelete}
      />
    </>
  );
}
