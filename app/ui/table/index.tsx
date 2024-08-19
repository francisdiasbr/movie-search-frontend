'use client';

import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

import TableBody from './Body';
import Pagination from './Pagination';
import PageSizeSelector from './Pagination/PageSizeSelector';
import * as S from './styles';
import { TableProps } from './types';

const Table = ({
  columns,
  entries,
  onPageChange,
  onPageSizeChange,
  pageIndex,
  pageSize,
  totalDocuments,
}: TableProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = (tconst: string) => {
    router.push(`${pathname}/${tconst}`);
  };

  const totalPages = Math.ceil(totalDocuments / pageSize);

  const handleNextPage = () => {
    if (pageIndex + 1 < totalPages) {
      onPageChange(pageIndex + 1);
    }
  };

  const handlePrevPage = () => {
    if (pageIndex > 0) {
      onPageChange(pageIndex - 1);
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
          handleClick={handleClick}
        />
      </S.StyledTable>
      <S.Footer>
        <Pagination
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
          pageIndex={pageIndex}
          totalPages={totalPages}
        />
        <PageSizeSelector
          onPageSizeChange={onPageSizeChange}
          pageSize={pageSize}
        />
      </S.Footer>
    </S.TableContainer>
  );
};

export default Table;
