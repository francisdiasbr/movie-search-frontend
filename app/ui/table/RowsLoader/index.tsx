import React from 'react';

import * as S from './styles';

interface TableRowsLoader {
  rowsNum: number;
  columns: any[];
}

const TableRowsLoader = ({ columns, rowsNum }: TableRowsLoader) => {
  return (
    <>
      {[...Array(rowsNum)].map((_, index) => (
        <S.Row key={index}>
          {columns.map((_, columnIndex) => (
            <S.Cell key={columnIndex}>
              <div
                style={{
                  animation: 'skeleton-pulse 1.5s ease-in-out infinite',
                  background: '#e5e5e5',
                  borderRadius: '4px',
                  height: '6px',
                }}
              />
            </S.Cell>
          ))}
        </S.Row>
      ))}
      <style>{`@keyframes skeleton-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }`}</style>
    </>
  );
};

export default TableRowsLoader;
