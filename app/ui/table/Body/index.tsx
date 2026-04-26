import { FaSearch } from 'react-icons/fa';

import LoadingSpinner from '../../LoadingSpinner';
import { TableBodyProps } from '../types';
import * as S from './styles';

const TableBody = ({
  columns,
  entries,
  handleDelete,
  handleView,
  isLoading,
}: TableBodyProps) => {
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
      {entries.map(item => (
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
      ))}
    </S.TableBody>
  );
};

export default TableBody;
