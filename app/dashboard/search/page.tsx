'use client';

import Table from '@/app/ui/Table';
import { searchMovie } from '@/lib/features/search/searchSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { Button, Input } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

export default function SearchPage() {
  const dispatch = useAppDispatch();
  const { entries, total_documents } = useAppSelector(
    (state) => state.moviesSearch
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    setIsLoading(true);
    const params = {
      filters: {},
      page: pageIndex + 1,
      pageSize,
      searchTerm: searchTerm,
      sorters: entries.primaryTitle,
    };
    dispatch(searchMovie(params))
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  };

  // Buscar novamente quando mudar o pageIndex
  useEffect(() => {
    if (pageIndex > 0 || pageSize > 0) {
      handleSearch();
    }
  }, [pageIndex, pageSize]);

  const columnData = [
    { key: 'tconst', label: 'IMDb code', width: '20%' },
    { key: 'primaryTitle', label: 'Title', width: '50%' },
    { key: 'startYear', label: 'Year', width: '30%' },
  ];

  return (
    <>
      <h1>Search</h1>
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
        <Button colorScheme='cyan' isLoading={isLoading} onClick={handleSearch}>
          Buscar
        </Button>
      </div>
      <Table
        columns={columnData}
        entries={entries}
        onPageChange={setPageIndex}
        onPageSizeChange={setPageSize}
        pageIndex={pageIndex}
        pageSize={pageSize}
        totalDocuments={total_documents}
      />
    </>
  );
}
