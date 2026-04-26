import * as S from './styles';

interface TableHeaderProps {
  columns: Array<{
    key: string;
    label: string;
    style?: React.CSSProperties;
  }>;
}

const TableHeader = ({ columns }: TableHeaderProps) => (
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
