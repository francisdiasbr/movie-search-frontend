'use client';

import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import eyeIcon from '@iconify/icons-lucide/eye';

import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { fetchCuratory } from '@/lib/features/movies/curatorySlice';
import Icon from '../Icon';
import styles from './table.module.css';
import { MovieItemTableProps } from './types';

const Table = () => {
  const pathname = usePathname();
  const router = useRouter()
  const dispatch = useAppDispatch();

  const { data } = useAppSelector((state) => state.moviesCuratory);

  useEffect(() => {
    dispatch(fetchCuratory());
  }, [dispatch]);

  const handleClick = (tconst: string) => {
    router.push(`${pathname}/${tconst}`);
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th scope="col" className={styles.header}>IMDb code</th>
          <th scope="col" className={styles.header}>Title</th>
          <th scope="col" className={styles.header}>Year</th>
          <th scope="col" className={styles.header}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item: MovieItemTableProps) => (
          <tr key={item.tconst} className={styles.row}>
            <td className={styles.cell}>{item.tconst}</td>
            <td className={styles.cell}>{item.primaryTitle}</td>
            <td className={styles.cell}>{item.startYear}</td>
            <td className={styles.cell}><button onClick={() => handleClick(item.tconst)}><Icon icon={eyeIcon} fontSize={16} /></button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
