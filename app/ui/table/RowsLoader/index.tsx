import React from "react";
import { Skeleton } from "@chakra-ui/react";

import * as S from './styles';

interface TableRowsLoader {
  rowsNum: number;
  columns: any[];
}

const TableRowsLoader = ({ columns, rowsNum }: TableRowsLoader) => {

  return (
    <>
      {
        [...Array(rowsNum)].map((_, index) => (
          <S.Row key={index}>
            {
              columns.map((_, columnIndex) => (
                <S.Cell key={columnIndex}>
                  <Skeleton height='10px' />
                </S.Cell>
              ))
            }
          </S.Row>
        ))
      }
    </>
  )
};

export default TableRowsLoader;