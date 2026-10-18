import * as S from './styles';

interface RowsLoaderProps {
  columnsNum: number;
  rowsNum: number;
}

// Skeleton rows shown while the first load (or a new search) is in flight.
const RowsLoader = ({ columnsNum, rowsNum }: RowsLoaderProps) => (
  <>
    {Array.from({ length: rowsNum }, (_, rowIndex) => (
      <S.Row key={rowIndex}>
        {Array.from({ length: columnsNum }, (_, columnIndex) => (
          <S.Cell key={columnIndex}>
            <S.Skeleton />
          </S.Cell>
        ))}
      </S.Row>
    ))}
  </>
);

export default RowsLoader;
