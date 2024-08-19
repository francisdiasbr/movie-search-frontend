import { Dispatch, SetStateAction } from "react";

export type Column = {
    key: string;
    label: string;
    isAction?: boolean;
    width?: any;
  };
  
  export type TableProps = {
    columns: Column[];
    entries: any[];
    pageIndex: number;
    pageSize: number;
    onPageChange: Dispatch<SetStateAction<number>>;
    onPageSizeChange: Dispatch<SetStateAction<number>>;
    totalDocuments: number;
  };

  export type TableBodyProps = {
    columns: Column[];
    entries: any[];
    handleClick: any;
  }