'use client';

import Table from '@/app/ui/Table';
import { searchMovie } from '@/lib/features/search/searchSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { Text, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import { addFavorite, resetAddStatus } from '@/lib/features/movie/movieDetailsSlice';
import { columnData } from './columnData';
import Search from '@/app/ui/Search';

export default function SearchPage() {
  const dispatch = useAppDispatch();
  const { entries, total_documents } = useAppSelector((state) => state.moviesSearch);
  const { addStatus } = useAppSelector((state) => state.moviesDetails);
  const toast = useToast();

  console.log('entries', entries);
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
    };
    dispatch(searchMovie(params))
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(0);
    handleSearch(0, newPageSize);
  };

  const handlePageChange = (newPage: number) => {
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
    if (addStatus === 'succeeded') {
      toast({
        title: 'Success',
        description: 'Movie added to favorites.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      dispatch(resetAddStatus());
    }
  }, [addStatus]);

  return (
    <>
      <Text fontSize='2xl' as='b'>Search Page</Text>
      <Search
        isLoading={isLoading}
        handleSearch={handleSearch}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
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
