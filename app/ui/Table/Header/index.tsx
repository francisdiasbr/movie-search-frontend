import { Column } from '../types';
import * as S from './styles';

interface TableHeaderProps<Row> {
  columns: Column<Row>[];
}

const TableHeader = <Row,>({ columns }: TableHeaderProps<Row>) => (
  <thead>
    <tr>
      {columns.map(column => (
        <S.Header key={column.key} style={column.style}>
          {column.label}
        </S.Header>
      ))}
    </tr>
  </thead>
);

export default TableHeader;
