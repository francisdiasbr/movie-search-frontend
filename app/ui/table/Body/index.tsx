'use client';

import eyeIcon from '@iconify/icons-lucide/eye';
import React from 'react';

import Icon from '../../Icon';
import { TableBodyProps } from '../types';
import * as S from './styles';

const TableBody = ({ columns, entries, handleClick }: TableBodyProps) => {
  return (
    <S.TableBody>
      {entries.map((item) => (
        <S.Row key={item.tconst}>
          {columns.map((column) => (
            <S.Cell key={column.key}>
              {column.isAction ? (
                <button onClick={() => handleClick(item.tconst)}>
                  <Icon fontSize={16} icon={eyeIcon} />
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
