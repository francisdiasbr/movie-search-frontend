import { CSSProperties, ReactNode } from 'react';

export interface Column<Row> {
  key: string;
  label: string;
  // Custom cell. Without it the cell shows `row[key]`.
  render?: (row: Row) => ReactNode;
  style?: CSSProperties;
}

export interface TableProps<Row> {
  columns: Column<Row>[];
  entries: Row[];
  isLoading: boolean;
  rowKey: (row: Row) => string;
  totalDocuments: number;
}

export interface TableBodyProps<Row> {
  columns: Column<Row>[];
  entries: Row[];
  isLoading: boolean;
  rowKey: (row: Row) => string;
}
