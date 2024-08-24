import { Dispatch, SetStateAction } from 'react';

export type Column = {
  isAction?: boolean;
  key: string;
  label: string;
  width?: any;
};

export type TableProps = {
  columns: Column[];
  entries: any[];
  onPageChange: Dispatch<SetStateAction<number>>;
  onPageSizeChange: Dispatch<SetStateAction<number>>;
  pageIndex: number;
  pageSize: number;
  totalDocuments: number;
};

export type TableBodyProps = {
  columns: Column[];
  entries: any[];
  handleDelete: any;
  handleEdit: any;
  handleView: any;
};
