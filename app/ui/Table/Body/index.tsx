import { ReactNode } from 'react';

import LoadingSpinner from '../../LoadingSpinner';
import RowsLoader from '../RowsLoader';
import { TableBodyProps } from '../types';
import * as S from './styles';

const SKELETON_ROWS = 10;

const TableBody = <Row,>({ columns, entries, isActionLoading, isLoading, rowKey }: TableBodyProps<Row>) => {
  if (isLoading && !isActionLoading) {
    return (
      <S.TableBody>
        <RowsLoader columnsNum={columns.length} rowsNum={SKELETON_ROWS} />
      </S.TableBody>
    );
  }

  if (isLoading) {
    return (
      <S.TableBody>
        <tr>
          <S.SpinnerCell colSpan={columns.length}>
            <LoadingSpinner />
          </S.SpinnerCell>
        </tr>
      </S.TableBody>
    );
  }

  return (
    <S.TableBody>
      {entries.map(row => (
        <S.Row key={rowKey(row)}>
          {columns.map(column => (
            <S.Cell key={column.key}>
              {column.render ? column.render(row) : ((row as Record<string, unknown>)[column.key] as ReactNode)}
            </S.Cell>
          ))}
        </S.Row>
      ))}
    </S.TableBody>
  );
};

export default TableBody;
