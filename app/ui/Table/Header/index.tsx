import { FaSortDown, FaSortUp } from 'react-icons/fa';

import { TableHeaderProps } from '../types';
import * as S from './styles';

const TableHeader = <Row,>({ columns, onSort, sortConfig }: TableHeaderProps<Row>) => (
  <thead>
    <tr>
      {columns.map(column => {
        const isSorted = column.sort && sortConfig?.key === column.key;
        return (
          <S.Header
            $sortable={Boolean(column.sort)}
            key={column.key}
            onClick={column.sort ? () => onSort(column.key) : undefined}
            style={column.style}
          >
            <S.Label>
              {column.label}
              {isSorted && (sortConfig?.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />)}
            </S.Label>
          </S.Header>
        );
      })}
    </tr>
  </thead>
);

export default TableHeader;
