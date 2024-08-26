'use client';

import { fetchFavorites } from '@/lib/features/movies/movieFavoritesSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import React, { useEffect, useState } from 'react';

import Table from '../../ui/Table';
import { columnData } from './columnData';
import Search from '@/app/ui/Search';
import { Button, Input } from '@chakra-ui/react';

export default function Page() {
  const dispatch = useAppDispatch();
  const { entries, total_documents } = useAppSelector((state) => state.moviesFavorites);

  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const handleDelete = (tconst: string) => {
    console.log(`Delete item with tconst: ${tconst}`);
  };

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
        handleDelete={() => {console.log('teste')}}
      />
    </>
  );
}
