import TableBody from './Body';
import Header from './Header';
import * as S from './styles';
import { TableProps } from './types';

export type { Column } from './types';

const Table = <Row,>({ columns, entries, isLoading, rowKey, totalDocuments }: TableProps<Row>) => (
  <S.TableContainer>
    <S.RecordCount>número de registros: {totalDocuments}</S.RecordCount>
    <S.StyledTable>
      <Header columns={columns} />
      <TableBody columns={columns} entries={entries} isLoading={isLoading} rowKey={rowKey} />
    </S.StyledTable>
  </S.TableContainer>
);

export default Table;
