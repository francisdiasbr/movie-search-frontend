'use client';

import React from 'react';

import * as S from './styles';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  pageSize: number;
  totalDocuments: number;
}

const Pagination = ({
  onPageSizeChange,
  onPageChange,
  pageSize,
  page,
  totalDocuments,
  totalPages,
}: PaginationProps) => {
  // console.log('PaginationProps: page', page);
  // console.log('PaginationProps: pageSize', pageSize);
  // console.log('PaginationProps: totalPages', totalPages);
  // console.log('PaginationProps: totalDocuments', totalDocuments);
  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    onPageSizeChange(Number(event.target.value));
  };

  const firstRecordInPage = page * pageSize + 1;
  const lastRecordInPage = (page + 1) * pageSize;
  // const lastRecordInPage = Math.min((page + 1) * pageSize, totalDocuments);

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
    <>
      <S.PaginationContainer>
        <S.PaginationButtons>
          <S.Button disabled={page === 0} onClick={handlePrevPage}>
            Anterior
          </S.Button>
          <S.PageValue>{page + 1}</S.PageValue>
          <S.Button disabled={page + 1 >= totalPages} onClick={handleNextPage}>
            Próximo
          </S.Button>
        </S.PaginationButtons>
        <S.SelectContainer
          id='pageSize'
          onChange={handlePageSizeChange}
          value={pageSize}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </S.SelectContainer>
        <S.TotalDocs>
          {firstRecordInPage} a {lastRecordInPage} de {totalDocuments}
        </S.TotalDocs>
      </S.PaginationContainer>
    </>
  );
};

export default Pagination;
