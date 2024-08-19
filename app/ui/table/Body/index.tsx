'use client';

import eyeIcon from '@iconify/icons-lucide/eye';
import React from 'react';

import Icon from '../../Icon';
import { TableBodyProps } from '../types';
import * as S from './styles';

const TableBody = ({ entries, columns, handleClick }: TableBodyProps) => {
  return (
    <S.TableBody>
      {entries.map((item) => (
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
    </S.TableBody>
  );
};

export default TableBody;
