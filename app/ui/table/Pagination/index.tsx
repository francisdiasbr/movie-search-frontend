'use client';

import React from 'react';

import * as S from './styles';

interface PaginationProps {
  handleNextPage: any;
  handlePrevPage: any;
  pageIndex: number;
  totalPages: number;
}

const Pagination = ({
  handleNextPage,
  handlePrevPage,
  pageIndex,
  totalPages,
}: PaginationProps) => {
  return (
    <S.PaginationContainer>
      <S.PaginationButtons>
        <S.Button onClick={handlePrevPage} disabled={pageIndex === 0}>
          Previous
        </S.Button>
        <S.PageValue>{pageIndex + 1}</S.PageValue>
        <S.Button
          onClick={handleNextPage}
          disabled={pageIndex + 1 >= totalPages}
        >
          Next
        </S.Button>
      </S.PaginationButtons>
    </S.PaginationContainer>
  );
};

export default Pagination;
