'use client';

import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

import TableBody from './Body';
import Pagination from './Pagination';
import * as S from './styles';
import { TableProps } from './types';

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

  const totalPages = Math.ceil(totalDocuments / pageSize);

  const handleView = (tconst: string) => {
    router.push(`${pathname}/${tconst}`);
  };

  const handleEdit = (tconst: string) => {
    router.push(`${pathname}/${tconst}/edit`);
  };


  const handleNextPage = () => {
    if (page + 1 < totalPages) {
      onPageChange(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 0) {
      onPageChange(page - 1);
    }
  };


  return (
    <S.TableContainer>
      <S.StyledTable>
        <thead>
          <tr>
            {columns.map((column) => (
              <S.Header key={column.key} width={column.width}>
                {column.label}
              </S.Header>
            ))}
          </tr>
        </thead>
          <TableBody
            columns={columns}
            entries={entries}
            isLoading={isLoading}
            handleAdd={handleAdd}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handleView={handleView}
          />
      </S.StyledTable>
      <S.Footer>
        <Pagination
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
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
