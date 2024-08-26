'use client';

import React, { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';

import { deleteFavorite, resetDeleteStatus } from '@/lib/features/movie/movieDetailsSlice';
import { fetchFavorites } from '@/lib/features/movies/movieFavoritesSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import Table from '../../ui/Table';
import { columnData } from './columnData';
import Search from '@/app/ui/Search';

export default function Page() {
  const dispatch = useAppDispatch();
  const { entries, total_documents } = useAppSelector((state) => state.moviesFavorites);
  const { delStatus } = useAppSelector((state) => state.moviesDetails);
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const handleSearch = (currentPage = page, currentPageSize = pageSize) => {
    setIsLoading(true);
    const params = {
      filters: {},
      page: currentPage + 1,
      pageSize: currentPageSize,
      searchTerm: searchTerm,
      sorters: entries.tconst,
    };
    console.log('params', params);
    dispatch(fetchFavorites(params))
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  };

  const handleDelete = (tconst: string) => {
    dispatch(deleteFavorite(tconst))
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const handlePageSizeChange = (newPageSize: number) => {
    // console.log('newPageSize em handlePageSizeChange', newPageSize);
    setPageSize(newPageSize);
    setPage(0);
    handleSearch(0, newPageSize);
  };

  const handlePageChange = (newPage: number) => {
    // console.log('newPage em handlePageChange', newPage);
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
      <p>Movies Page</p>
      <Search
        isLoading={isLoading}
        handleSearch={handleSearch}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <Table
        columns={columnData}
        entries={entries}
        isLoading={isLoading}
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
