'use client';

import React, { useEffect, useState } from 'react';
import { Text, useToast } from '@chakra-ui/react';

import { deleteFavorite, resetDeleteStatus } from '@/lib/features/movie/movieDetailsSlice';
import { fetchFavorites } from '@/lib/features/movies/movieFavoritesSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import Table from '../../ui/Table';
import { columnData } from './columnData';
import Search from '@/app/ui/Search';

export default function Page() {
  const dispatch = useAppDispatch();
  const { entries, total_documents, status } = useAppSelector((state) => state.moviesFavorites);
  const { delStatus } = useAppSelector((state) => state.moviesDetails);
  const toast = useToast();

  const [searchTerm, setSearchTerm] = useState('');
  const [country, setCountry] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [year, setYear] = useState<number | undefined>(undefined);

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
    dispatch(fetchFavorites(params))
  };

  const handleDelete = (tconst: string) => {
    dispatch(deleteFavorite(tconst))
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(0);
    handleSearch(0, newPageSize);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    handleSearch(newPage, pageSize);
  }

  useEffect(() => {
    if(delStatus === 'succeeded') {
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
        variant: 'top-accent'
      });
    }
    if(delStatus === 'succeeded' || delStatus === 'failed') {
      dispatch(resetDeleteStatus());
    }
  }, [delStatus, dispatch, toast]);

  return (
    <>
      <Text fontSize='2xl' as='b'>Favorite movies Page</Text>
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
      />
      <Table
        columns={columnData}
        entries={entries}
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
