'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import eyeIcon from '@iconify/icons-lucide/eye';

import Icon from '../Icon';
import * as S from './styles';
import {TableProps } from './types';

const Table = ({columns, data}: TableProps) => {
  const pathname = usePathname();
  const router = useRouter()
  
  const handleClick = (tconst: string) => {
    router.push(`${pathname}/${tconst}`);
  };

  return (
    <S.StyledTable>
      <thead>
        <tr>
          {columns.map((column) => (
            <S.Header key={column.key}>
              {column.label}
            </S.Header>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <S.Row key={item.tconst}>
            {columns.map((column) => (
              <S.Cell key={column.key}>
                {column.isAction ? (
                  <button onClick={() => handleClick(item.tconst)}>
                    <Icon icon={eyeIcon} fontSize={16} />
                  </button>
                ) : (
                  item[column.key]
                )}
              </S.Cell>
            ))}
          </S.Row>
        ))}
      </tbody>
    </S.StyledTable>
  );
};

export default Table;
