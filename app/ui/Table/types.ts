import { CSSProperties, ReactNode } from 'react';

export type SortDirection = 'ascending' | 'descending';

export interface SortConfig {
  direction: SortDirection;
  key: string;
}

export interface Column<Row> {
  key: string;
  label: string;
  // Custom cell. Without it the cell shows `row[key]`.
  render?: (row: Row) => ReactNode;
  // Clicking the header sorts the visible entries by `row[key]`.
  sort?: boolean;
  style?: CSSProperties;
}

export interface TableProps<Row> {
  columns: Column<Row>[];
  entries: Row[];
  // A row action (delete, toggle) triggered the reload: shows a spinner
  // instead of the skeleton so the table does not flicker.
  isActionLoading?: boolean;
  isLoading: boolean;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  // 1-based, as the backend expects it.
  page: number;
  pageSize: number;
  rowKey: (row: Row) => string;
  totalDocuments: number;
}

export interface TableBodyProps<Row> {
  columns: Column<Row>[];
  entries: Row[];
  isActionLoading: boolean;
  isLoading: boolean;
  rowKey: (row: Row) => string;
}

export interface TableHeaderProps<Row> {
  columns: Column<Row>[];
  onSort: (key: string) => void;
  sortConfig: SortConfig | null;
}

export interface PaginationProps {
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  page: number;
  pageSize: number;
  totalDocuments: number;
}
