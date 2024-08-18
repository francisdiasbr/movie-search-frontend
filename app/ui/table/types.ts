export type Column = {
    key: string;
    label: string;
    isAction?: boolean;
  };
  
  export type TableProps = {
    columns: Column[];
    data: any[];
  };