'use client';

import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { fetchCuratory } from '@/lib/features/movies/curatorySlice';
import Table from '../../ui/Table';

export default function Page() {

  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.moviesCuratory);

  useEffect(() => {
    dispatch(fetchCuratory());
  }, [dispatch]);

  const columns = [
    { key: 'actions', label: 'Actions', isAction: true },
    { key: 'tconst', label: 'IMDb code' },
    { key: 'primaryTitle', label: 'Title' },
    { key: 'startYear', label: 'Year' },
  ];

  return (
    <>
      <p>Movies Page</p>
      <Table columns={columns} data={data}/>
    </>
  )
}