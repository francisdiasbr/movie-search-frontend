'use client';

import Table from '@/app/ui/Table';
import { searchMovie } from '@/lib/features/search/searchSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { Button, Input, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import { addFavorite, resetAddStatus } from '@/lib/features/movie/movieDetailsSlice';
import { columnData } from './columnData';

export default function SearchPage() {
  const dispatch = useAppDispatch();
  const { entries, total_documents } = useAppSelector((state) => state.moviesSearch);
  const { status } = useAppSelector((state) => state.moviesDetails);
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
    // console.log('params', params);
    dispatch(searchMovie(params))
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  };

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

  const handleAdd = (tconst: string) => {
    setIsLoading(true);
    dispatch(addFavorite(tconst))
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }

  useEffect(() => {
    if (status === 'succeeded') {
      toast({
        title: 'Success',
        description: 'Movie added to favorites.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      dispatch(resetAddStatus())
    }
  }, [status]);

  return (
    <>
      <h1>Search movie</h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '8px',
          marginBottom: '16px',
        }}
      >
        <Input
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Search for movies'
          type='search'
          value={searchTerm}
        />
        <Button isLoading={isLoading} onClick={() => handleSearch()}>
          Buscar
        </Button>
      </div>
      <Table
        columns={columnData}
        entries={entries}
        handleAdd={handleAdd}
        isLoading={isLoading}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        page={page}
        pageSize={pageSize}
        totalDocuments={total_documents}
      />
    </>
  );
}
