import React from 'react';

import * as S from './styles';

interface PaginationProps {
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  page: number;
  pageSize: number;
  totalDocuments: number;
  totalPages: number;
}

const Pagination = ({
  onPageChange,
  onPageSizeChange,
  page,
  pageSize,
  totalDocuments,
  totalPages,
}: PaginationProps) => {
  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    onPageSizeChange(Number(event.target.value));
  };

  const firstRecordInPage = page * pageSize + 1;
  const lastRecordInPage = (page + 1) * pageSize;

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
  );
};

export default Pagination;
