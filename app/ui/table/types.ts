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
  totalDocuments: number;
};

export type TableBodyProps = {
  columns: Column[];
  entries: any[];
  handleAdd: any;
  handleDelete: any;
  handleEdit: any;
  handleView: any;
  isLoading: boolean;
};

export type Column = {
  isAction?: boolean;
  isFavAction?: boolean;
  key: string;
  label: string;
  width?: any;
};