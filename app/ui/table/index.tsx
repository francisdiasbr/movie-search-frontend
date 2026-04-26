import { useLocation, useNavigate } from 'react-router-dom';

import TableBody from './Body';
import Header from './Header';
import * as S from './styles';
import { TableProps } from './types';

const Table = ({
  columns,
  entries,
  handleDelete,
  isLoading,
  totalDocuments,
}: TableProps) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleView = (tconst: string) => {
    navigate(`${pathname}/${tconst}`);
  };

  return (
    <S.TableContainer>
      <S.RecordCount>número de registros: {totalDocuments}</S.RecordCount>
      <S.StyledTable>
        <Header columns={columns} />
        <TableBody
          columns={columns}
          entries={entries}
          handleDelete={handleDelete}
          handleView={handleView}
          isLoading={isLoading}
        />
      </S.StyledTable>
    </S.TableContainer>
  );
};

export default Table;
