export interface TableProps {
  columns: Column[];
  entries: any[];
  handleDelete?: any;
  isLoading: boolean;
  totalDocuments: number;
}

export interface TableBodyProps {
  columns: Column[];
  entries: any[];
  handleDelete?: (tconst: string) => void;
  handleView: (tconst: string) => void;
  isLoading: boolean;
}

export type Column = {
  isAction?: boolean;
  isDelete?: boolean;
  key: string;
  label: string;
  width?: any;
};
