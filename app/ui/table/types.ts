export interface TableProps {
  columns: Column[];
  entries: any[];
  handleAdd?: (tconst: string) => void;
  handleDelete?: any;
  handleWatchedUpdate?: () => void;
  isActionLoading?: boolean;
  isLoading: boolean;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  page: number;
  pageSize: number;
  renderRow?: (entry: any) => JSX.Element;
  totalDocuments: number;
}

export interface TableBodyProps {
  columns: Column[];
  entries: any[];
  handleAdd?: (tconst: string) => void;
  handleDelete?: (tconst: string) => void;
  handleView: (tconst: string) => void;
  handleWatchedUpdate?: () => void;
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
