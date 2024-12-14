'use client';

import { Tag } from '@chakra-ui/react';
import starFilledIcon from '@iconify/icons-ic/baseline-star';
import starOutlineIcon from '@iconify/icons-ic/outline-star';
import editIcon from '@iconify/icons-lucide/edit-2';
import eyeIcon from '@iconify/icons-lucide/eye';
import trashIcon from '@iconify/icons-lucide/trash-2';
import React, { useState } from 'react';

import Icon from '../../Icon';
import TableRowsLoader from '../RowsLoader';
import { TableBodyProps } from '../types';
import * as S from './styles';

const TableBody = ({
  columns,
  entries,
  handleAdd,
  handleDelete,
  handleEdit,
  handleView,
  isLoading,
}: TableBodyProps) => {
  const [selectedTconst, setSelectedTconst] = useState<string | null>(null);

  const handleStarClick = (tconst: string) => {
    console.log('tconst selecionado', tconst);
    setSelectedTconst(tconst === selectedTconst ? null : tconst);
    handleAdd(tconst);
  };

  // console.log('entries', entries)

  return (
    <S.TableBody>
      {isLoading ? (
        <TableRowsLoader rowsNum={10} columns={columns} />
      ) : (
        entries.map(item => (
          <S.Row key={item.tconst}>
            {columns.map(column => (
              <S.Cell key={column.key}>
                {column.isAction ? (
                  <S.ButtonGroup>
                    <button onClick={() => handleView(item.tconst)}>
                      <Icon fontSize={20} icon={eyeIcon} />
                    </button>
                    <button onClick={() => handleEdit(item.tconst)}>
                      <Icon fontSize={20} icon={editIcon} />
                    </button>
                    <button onClick={() => handleDelete(item.tconst)}>
                      <Icon fontSize={20} icon={trashIcon} />
                    </button>
                  </S.ButtonGroup>
                ) : column.isFavAction ? (
                  <S.ButtonGroup>
                    <button onClick={() => handleStarClick(item.tconst)}>
                      <Icon
                        fontSize={20}
                        icon={
                          selectedTconst === item.tconst
                            ? starFilledIcon
                            : starOutlineIcon
                        }
                        style={{
                          color:
                            selectedTconst === item.tconst ? '#907f0e' : '#ccc',
                        }}
                      />
                    </button>
                  </S.ButtonGroup>
                ) : column.key === 'watched' ? (
                  item[column.key] ? (
                    <Tag colorScheme='green'>já vi</Tag>
                  ) : (
                    <Tag colorScheme='red'>não vi</Tag>
                  )
                ) : (
                  item[column.key]
                )}
              </S.Cell>
            ))}
          </S.Row>
        ))
      )}
    </S.TableBody>
  );
};

export default TableBody;
