import React, { useState, useEffect } from 'react';

import * as S from './styles';

interface TableHeaderProps {
  columns: Array<{
    key: string;
    label: string;
    sort?: boolean;
    style?: React.CSSProperties;
  }>;
  entries: any[];
  setSortedEntries: (entries: any[]) => void;
}

const TableHeader = ({
  columns,
  entries,
  setSortedEntries,
}: TableHeaderProps) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  } | null>(null);

  useEffect(() => {
    if (sortConfig) {
      const sortedData = [...entries].sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        
        // Handle boolean values (for watched column) - treat undefined as false
        if ((typeof aValue === 'boolean' || aValue === undefined) && 
            (typeof bValue === 'boolean' || bValue === undefined)) {
          const aBool = aValue === true;
          const bBool = bValue === true;
          
          if (sortConfig.direction === 'ascending') {
            return aBool === bBool ? 0 : aBool ? 1 : -1;
          } else {
            return aBool === bBool ? 0 : aBool ? -1 : 1;
          }
        }
        
        // Handle startYear column specifically (mixed numbers and strings)
        if (sortConfig.key === 'startYear') {
          const aNum = typeof aValue === 'number' ? aValue : (typeof aValue === 'string' && !isNaN(Number(aValue)) ? Number(aValue) : Infinity);
          const bNum = typeof bValue === 'number' ? bValue : (typeof bValue === 'string' && !isNaN(Number(bValue)) ? Number(bValue) : Infinity);
          
          if (aNum < bNum) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (aNum > bNum) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        }
        
        // Handle other types (strings, numbers)
        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
      setSortedEntries(sortedData);
    }
  }, [entries, sortConfig, setSortedEntries]);

  const requestSort = (key: string) => {
    let direction = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <thead>
      <tr>
        {columns.map(column => (
          <S.Header
            onClick={column.sort ? () => requestSort(column.key) : undefined}
            key={column.key}
            style={{
              cursor: column.sort ? 'pointer' : 'default',
              ...column.style,
            }}
          >
            {column.label}
            {column.sort && sortConfig?.key === column.key
              ? sortConfig.direction === 'ascending'
                ? ' 🔼'
                : ' 🔽'
              : null}
          </S.Header>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
