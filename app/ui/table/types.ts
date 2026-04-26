export interface TableProps {
  columns: Column[];
  entries: any[];
  handleDelete?: any;
  isActionLoading?: boolean;
  isLoading: boolean;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  page: number;
  pageSize: number;
  totalDocuments: number;
}

export interface TableBodyProps {
  columns: Column[];
  entries: any[];
  handleDelete?: (tconst: string) => void;
  handleView: (tconst: string) => void;
  isActionLoading?: boolean;
  isLoading: boolean;
}

export type Column = {
  isAction?: boolean;
  isDelete?: boolean;
  key: string;
  label: string;
  width?: any;
};
