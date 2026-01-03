'use client';

import { Tag, IconButton } from '@chakra-ui/react';
import React from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';


import LoadingSpinner from '../../LoadingSpinner';
import TableRowsLoader from '../RowsLoader';
import { TableBodyProps } from '../types';
import * as S from './styles';

const TableBody = ({
  columns,
  entries,
  handleView,
  handleDelete,
  isLoading,
  isActionLoading,
  handleWatchedUpdate,
}: TableBodyProps) => {
  
  return (
    <S.TableBody>
      {isLoading && !isActionLoading ? (
        <TableRowsLoader rowsNum={10} columns={columns} />
      ) : isLoading && isActionLoading ? (
        <tr>
          <S.LoadingCell colSpan={columns.length}>
            <LoadingSpinner />
          </S.LoadingCell>
        </tr>
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
                      size="md"
                      borderRadius="full"
                      _hover={{
                        transform: 'scale(1.1)',
                      }}
                      transition="all 0.2s"
                    />
                  </S.ButtonGroup>
                ) : column.isDelete && column.key === 'deleteReview' ? (
                  item.deleteReview
                ) : column.isDelete ? (
                  <IconButton
                    aria-label="Deletar"
                    icon={<FaTimes />}
                    onClick={() => handleDelete && handleDelete(item.tconst)}
                    size="sm"
                    colorScheme="red"
                    variant="ghost"
                    _hover={{
                      transform: 'scale(1.1)',
                      color: 'red.500',
                    }}
                    transition="all 0.2s"
                  />
                ) : column.key === 'watched' ? (
                  item[column.key]
                ) : column.key === 'review' ? (
                  item[column.key]
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
