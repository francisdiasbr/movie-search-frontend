'use client';

import React, { useState, useEffect } from 'react';
import * as S from './styles';

interface TableHeaderProps {
  columns: Array<{ key: string; label: string; minWidth?: string, width?: string, sort?: boolean }>;
  entries: any[];
  setSortedEntries: (entries: any[]) => void;
}

const TableHeader = ({ columns, entries, setSortedEntries }: TableHeaderProps) => {
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: string } | null>(null);

  useEffect(() => {
    if (sortConfig) {
      const sortedData = [...entries].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
      setSortedEntries(sortedData);
    }
  }, [entries, sortConfig, setSortedEntries]);

  const requestSort = (key: string) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <S.Header
            key={column.key}
            width={column.width}
            minWidth={column.minWidth}
            onClick={column.sort ? () => requestSort(column.key) : undefined}
            style={{ cursor: column.sort ? 'pointer' : 'default' }}
          >
            {column.label}
            {column.sort && sortConfig?.key === column.key ? (
              sortConfig.direction === 'ascending' ? ' 🔼' : ' 🔽'
            ) : null}
          </S.Header>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
