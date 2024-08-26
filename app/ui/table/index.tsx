'use client';

import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';

import TableBody from './Body';
import Pagination from './Pagination';
import * as S from './styles';
import { TableProps } from './types';
import Header from './Header';

const Table = ({
  columns,
  entries,
  handleAdd,
  handleDelete,
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
  
  const totalPages = Math.ceil(totalDocuments / pageSize);

  const handleView = (tconst: string) => {
    router.push(`${pathname}/${tconst}`);
  };

  const handleEdit = (tconst: string) => {
    router.push(`${pathname}/${tconst}/edit`);
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
          handleAdd={handleAdd}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
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
