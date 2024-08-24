'use client';

import editIcon from '@iconify/icons-lucide/edit-2';
import eyeIcon from '@iconify/icons-lucide/eye';
import trashIcon from '@iconify/icons-lucide/trash-2';
import React from 'react';

import Icon from '../../Icon';
import { TableBodyProps } from '../types';
import * as S from './styles';

const TableBody = ({
  columns,
  entries,
  handleDelete,
  handleEdit,
  handleView,
}: TableBodyProps) => {
  return (
    <S.TableBody>
      {entries.map((item) => (
        <S.Row key={item.tconst}>
          {columns.map((column) => (
            <S.Cell key={column.key}>
              {column.isAction ? (
                <S.ButtonGroup>
                  <button onClick={() => handleView(item.tconst)}>
                    <Icon fontSize={20} icon={eyeIcon} />
                  </button>
                  <button onClick={() => handleDelete(item.tconst)}>
                    <Icon fontSize={20} icon={trashIcon} />
                  </button>
                  <button onClick={() => handleEdit(item.tconst)}>
                    <Icon fontSize={20} icon={editIcon} />
                  </button>
                </S.ButtonGroup>
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
