'use client';

import React from 'react';

import * as S from './styles';

interface PageSizeSelectorProps {
  onPageSizeChange: (pageSize: number) => void;
  pageSize: number;
}

const PageSizeSelector = ({
  onPageSizeChange,
  pageSize,
}: PageSizeSelectorProps) => {
  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    onPageSizeChange(Number(event.target.value));
  };

  return (
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
  );
};

export default PageSizeSelector;
