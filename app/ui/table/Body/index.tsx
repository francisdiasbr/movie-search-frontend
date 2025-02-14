'use client';

import { Tag, IconButton, Tooltip } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import starFilledIcon from '@iconify/icons-ic/baseline-star';
import starOutlineIcon from '@iconify/icons-ic/outline-star';
import eyeIcon from '@iconify/icons-lucide/eye';
import React, { useState } from 'react';
import { ViewIcon } from '@chakra-ui/icons';

import Icon from '../../Icon';
import TableRowsLoader from '../RowsLoader';
import { TableBodyProps } from '../types';
import * as S from './styles';

const TableBody = ({
  columns,
  entries,
  handleAdd,
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
                    <IconButton
                      aria-label="Visualizar"
                      icon={<FaSearch />}
                      onClick={() => handleView(item.tconst)}
                      size="lg"
                      colorScheme="blue"
                      color="black"
                      borderRadius="full"
                      _hover={{
                        transform: 'scale(1.1)',
                      }}
                      transition="all 0.2s"
                    />
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
                    <Tag colorScheme='green'>Sim</Tag>
                  ) : (
                    <Tag colorScheme='red'>Não</Tag>
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
