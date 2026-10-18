import { ChangeEvent } from 'react';

import Button from '../../Button';
import { PaginationProps } from '../types';
import * as S from './styles';

const PAGE_SIZES = [5, 10, 50, 100];

const Pagination = ({ onPageChange, onPageSizeChange, page, pageSize, totalDocuments }: PaginationProps) => {
  const totalPages = Math.max(1, Math.ceil(totalDocuments / pageSize));
  const firstRecordInPage = totalDocuments === 0 ? 0 : (page - 1) * pageSize + 1;
  const lastRecordInPage = Math.min(page * pageSize, totalDocuments);

  const handlePageSizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onPageSizeChange(Number(event.target.value));
  };

  return (
    <S.PaginationContainer>
      <S.PaginationButtons>
        <Button disabled={page <= 1} onClick={() => onPageChange(page - 1)} size='small' variant='outline'>
          Anterior
        </Button>
        <S.PageValue>{page}</S.PageValue>
        <Button disabled={page >= totalPages} onClick={() => onPageChange(page + 1)} size='small' variant='outline'>
          Próximo
        </Button>
      </S.PaginationButtons>
      <S.PageSizeSelect aria-label='Registros por página' onChange={handlePageSizeChange} value={pageSize}>
        {PAGE_SIZES.map(size => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </S.PageSizeSelect>
      <S.TotalDocs>
        {firstRecordInPage} a {lastRecordInPage} de {totalDocuments}
      </S.TotalDocs>
    </S.PaginationContainer>
  );
};

export default Pagination;
