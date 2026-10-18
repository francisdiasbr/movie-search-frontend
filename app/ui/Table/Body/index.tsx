import { ReactNode } from 'react';

import LoadingSpinner from '../../LoadingSpinner';
import { TableBodyProps } from '../types';
import * as S from './styles';

const TableBody = <Row,>({ columns, entries, isLoading, rowKey }: TableBodyProps<Row>) => {
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
