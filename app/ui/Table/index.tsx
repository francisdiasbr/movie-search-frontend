import { useMemo, useState } from 'react';

import TableBody from './Body';
import Header from './Header';
import Pagination from './Pagination';
import { sortEntries } from './sort';
import * as S from './styles';
import { SortConfig, TableProps } from './types';

export type { Column, SortConfig, SortDirection } from './types';

const Table = <Row,>({
  columns,
  entries,
  isActionLoading = false,
  isLoading,
  onPageChange,
  onPageSizeChange,
  page,
  pageSize,
  rowKey,
  totalDocuments,
}: TableProps<Row>) => {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  // Sorting is local to the page on screen; the backend keeps its own order.
  const sortedEntries = useMemo(() => sortEntries(entries, sortConfig), [entries, sortConfig]);

  const handleSort = (key: string) => {
    setSortConfig(current =>
      current?.key === key && current.direction === 'ascending'
        ? { direction: 'descending', key }
        : { direction: 'ascending', key }
    );
  };

  return (
    <S.TableContainer>
      <S.StyledTable>
        <Header columns={columns} onSort={handleSort} sortConfig={sortConfig} />
        <TableBody
          columns={columns}
          entries={sortedEntries}
          isActionLoading={isActionLoading}
          isLoading={isLoading}
          rowKey={rowKey}
        />
      </S.StyledTable>
      <S.Footer>
        <Pagination
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          page={page}
          pageSize={pageSize}
          totalDocuments={totalDocuments}
        />
      </S.Footer>
    </S.TableContainer>
  );
};

export default Table;
