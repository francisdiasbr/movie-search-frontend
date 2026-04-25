import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import TableBody from './Body';
import Header from './Header';
import Pagination from './Pagination';
import * as S from './styles';
import { TableProps } from './types';

const Table = ({
  columns,
  entries,
  handleDelete,
  isActionLoading,
  isLoading,
  onPageChange,
  onPageSizeChange,
  page,
  pageSize,
  totalDocuments,
}: TableProps) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [sortedEntries, setSortedEntries] = useState(entries);

  useEffect(() => {
    setSortedEntries(entries);
  }, [entries]);

  const totalPages = Math.ceil(totalDocuments / pageSize);

  const handleView = (tconst: string) => {
    navigate(`${pathname}/${tconst}`);
  };

  return (
    <S.TableContainer>
      <S.StyledTable>
        <Header
          columns={columns}
          entries={entries}
          setSortedEntries={setSortedEntries}
        />
        <TableBody
          columns={columns}
          entries={sortedEntries}
          handleDelete={handleDelete}
          handleView={handleView}
          isActionLoading={isActionLoading}
          isLoading={isLoading}
        />
      </S.StyledTable>
      <S.Footer>
        <Pagination
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          page={page}
          pageSize={pageSize}
          totalDocuments={totalDocuments}
          totalPages={totalPages}
        />
      </S.Footer>
    </S.TableContainer>
  );
};

export default Table;
