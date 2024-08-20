'use client';

import Table from '@/app/ui/Table';
import { searchMovie } from '@/lib/features/search/searchSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import React, { useState } from 'react';

export default function SearchPage() {
  const dispatch = useAppDispatch();
  const { entries, total_documents } = useAppSelector(
    (state) => state.moviesSearch
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const handleSearch = () => {
    const params = {
      filters: {},
      page: pageIndex + 1,
      pageSize,
      searchTerm: searchTerm,
      sorters: entries.primaryTitle,
    };
    dispatch(searchMovie(params));
  };

  const columnData = [
    { key: 'tconst', label: 'IMDb code', width: '33.3%' },
    { key: 'primaryTitle', label: 'Title', width: '33.3%' },
    { key: 'startYear', label: 'Year', width: '33.3%' },
  ];

  return (
    <>
      <h1>Search</h1>
      <input
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder='Search for movies'
        type='search'
        value={searchTerm}
      />
      <button onClick={handleSearch}>Buscar</button>
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
