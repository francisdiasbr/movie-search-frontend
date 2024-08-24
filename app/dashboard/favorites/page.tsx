'use client';

import { fetchFavorites } from '@/lib/features/movies/movieFavoritesSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import React, { useEffect, useState } from 'react';

import Table from '../../ui/Table';

export default function Page() {
  const dispatch = useAppDispatch();
  const { entries, total_documents } = useAppSelector(
    (state) => state.moviesFavorites
  );

  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const params = {
      filters: {},
      page: pageIndex + 1,
      pageSize,
    };
    dispatch(fetchFavorites(params));
  }, [dispatch, pageIndex, pageSize]);

  const columnData = [
    { isAction: true, key: 'actions', label: 'Actions', width: '15%' },
    { key: 'tconst', label: 'IMDb code', width: '15%' },
    { key: 'primaryTitle', label: 'Title', width: '50%' },
    { key: 'startYear', label: 'Year', width: '20%' },
  ];

  const handleDelete = (tconst: string) => {
    console.log(`Delete item with tconst: ${tconst}`);
  };

  return (
    <>
      <p>Movies Page</p>
      <Table
        columns={columnData}
        entries={entries}
        onPageChange={setPageIndex}
        onPageSizeChange={setPageSize}
        pageIndex={pageIndex}
        pageSize={pageSize}
        totalDocuments={total_documents}
        handleDelete={() => {console.log('teste')}}
      />
    </>
  );
}
