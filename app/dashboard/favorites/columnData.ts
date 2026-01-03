export const columnData = [
  {
    key: 'primaryTitle',
    label: 'Title',
    style: {
      minWidth: '200px',
      width: '35%',
    },
    sort: true,
  },
  {
    key: 'watched',
    label: 'Watched',
    style: {
      minWidth: '100px',
      width: '10%',
    },
    sort: true,
  },
  {
    key: 'review',
    label: 'Review',
    style: {
      minWidth: '80px',
      width: '10%',
    },
    sort: false,
  },
  {
    key: 'deleteReview',
    label: 'Excluir review',
    isDelete: true,
    isSortable: false,
    style: {
      minWidth: '50px',
      width: '5%',
    },
  },
  {
    key: 'delete',
    label: 'Excluir favorito',
    isDelete: true,
    isSortable: false,
    style: {
      minWidth: '50px',
      width: '3%',
    },
  }
];
