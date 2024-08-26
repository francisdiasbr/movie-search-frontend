'use client';

import { fetchFavorites } from '@/lib/features/movies/movieFavoritesSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import React, { useEffect, useState } from 'react';

import Table from '../../ui/Table';
import { columnData } from './columnData';

export default function Page() {
  const dispatch = useAppDispatch();
  const { entries, total_documents } = useAppSelector((state) => state.moviesFavorites);

  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const params = {
      filters: {},
      page: page + 1,
      pageSize,
    };
    setIsLoading(true);
    dispatch(fetchFavorites(params)).finally(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    });
  }, [dispatch, page, pageSize]);

  const handleDelete = (tconst: string) => {
    console.log(`Delete item with tconst: ${tconst}`);
  };

  return (
    <>
      <p>Movies Page</p>
      <Table
        columns={columnData}
        entries={entries}
        isLoading={isLoading}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        page={page}
        pageSize={pageSize}
        totalDocuments={total_documents}
        handleDelete={() => {console.log('teste')}}
      />
    </>
  );
}
