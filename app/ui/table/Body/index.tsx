import React from 'react';
import { FaSearch } from 'react-icons/fa';

import LoadingSpinner from '../../LoadingSpinner';
import TableRowsLoader from '../RowsLoader';
import { TableBodyProps } from '../types';
import * as S from './styles';

const TableBody = ({
  columns,
  entries,
  handleDelete,
  handleView,
  handleWatchedUpdate,
  isActionLoading,
  isLoading,
}: TableBodyProps) => {
  return (
    <S.TableBody>
      {isLoading && !isActionLoading ? (
        <TableRowsLoader rowsNum={10} columns={columns} />
      ) : isLoading && isActionLoading ? (
        <tr>
          <S.LoadingCell colSpan={columns.length}>
            <LoadingSpinner />
          </S.LoadingCell>
        </tr>
      ) : (
        entries.map(item => (
          <S.Row key={item.tconst}>
            {columns.map(column => (
              <S.Cell key={column.key}>
                {column.isAction ? (
                  <S.ButtonGroup>
                    <button onClick={() => handleView(item.tconst)} title='Visualizar'>
                      <FaSearch />
                    </button>
                  </S.ButtonGroup>
                ) : column.isDelete && column.key === 'deleteReview' ? (
                  item.deleteReview
                ) : column.isDelete ? (
                  <button
                    onClick={() => handleDelete && handleDelete(item.tconst)}
                    title='Deletar'
                    style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    x
                  </button>
                ) : (
                  item[column.key]
                )}
              </S.Cell>
            ))}
          </S.Row>
        ))
      )}
    </S.TableBody>
  );
};

export default TableBody;
