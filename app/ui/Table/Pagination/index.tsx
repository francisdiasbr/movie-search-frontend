import { toSelectOptions } from '../../../util/select';
import Button from '../../Button';
import Select from '../../Select';
import { PaginationProps } from '../types';
import * as S from './styles';

const PAGE_SIZES = toSelectOptions([5, 10, 50, 100]);

const Pagination = ({ onPageChange, onPageSizeChange, page, pageSize, totalDocuments }: PaginationProps) => {
  const totalPages = Math.max(1, Math.ceil(totalDocuments / pageSize));
  const firstRecordInPage = totalDocuments === 0 ? 0 : (page - 1) * pageSize + 1;
  const lastRecordInPage = Math.min(page * pageSize, totalDocuments);

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
      <S.PageSize>
        <Select
          label='Registros por página'
          onChange={size => onPageSizeChange(Number(size))}
          options={PAGE_SIZES}
          size='small'
          value={String(pageSize)}
        />
      </S.PageSize>
      <S.TotalDocs>
        {firstRecordInPage} a {lastRecordInPage} de {totalDocuments}
      </S.TotalDocs>
    </S.PaginationContainer>
  );
};

export default Pagination;
