export interface TableProps {
  columns: Column[];
  entries: any[];
  handleDelete?: (tconst: string) => void;
  isLoading: boolean;
  totalDocuments: number;
}

export interface TableBodyProps {
  columns: Column[];
  entries: any[];
  handleDelete?: (tconst: string) => void;
  isLoading: boolean;
}

export type Column = {
  isDelete?: boolean;
  key: string;
  label: string;
};
