'use client';

import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import TableBody from './Body';
import Header from './Header';
import Pagination from './Pagination';
import * as S from './styles';
import { TableProps } from './types';

const Table = ({
  columns,
  entries,
  isLoading,
  onPageChange,
  onPageSizeChange,
  page,
  pageSize,
  totalDocuments,
}: TableProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const [sortedEntries, setSortedEntries] = useState(entries);

  useEffect(() => {
    setSortedEntries(entries);
  }, [entries]);

  const totalPages = Math.ceil(totalDocuments / pageSize);

  const handleView = (tconst: string) => {
    router.push(`${pathname}/${tconst}`);
  };

  return (
    <S.TableContainer>
      <S.StyledTable>
        <Header
          columns={columns}
          entries={entries}
          setSortedEntries={setSortedEntries}
        />
        <TableBody
          columns={columns}
          entries={sortedEntries}
          isLoading={isLoading}
          handleView={handleView}
        />
      </S.StyledTable>
      <S.Footer>
        <Pagination
          onPageChange={onPageChange}
          page={page}
          totalPages={totalPages}
          onPageSizeChange={onPageSizeChange}
          pageSize={pageSize}
          totalDocuments={totalDocuments}
        />
      </S.Footer>
    </S.TableContainer>
  );
};

export default Table;
