export type TableProps = {
  columns: Column[];
  entries: any[];
  handleAdd?: any;
  handleDelete?: any;
  isLoading: boolean;
  onPageChange: (newPage: number) => void;
  onPageSizeChange: (newPageSize: number) => void;
  page: number;
  pageSize: number;
  renderRow?: (entry: any) => JSX.Element;
  totalDocuments: number;
};

export interface TableBodyProps {
  columns: Column[];
  entries: any[];
  handleAdd?: (tconst: string) => void;
  handleView: (tconst: string) => void;
  isLoading: boolean;
};

export type Column = {
  isAction?: boolean;
  isFavAction?: boolean;
  key: string;
  label: string;
  width?: any;
};
