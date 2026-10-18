import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { ROUTES } from '../../const';
import IconButton from '../../ui/IconButton';
import { Column } from '../../ui/Table';
import WatchedTag from './components/WatchedTag';
import * as S from './styles';
import { FavoriteEntry } from './types';

interface ColumnHandlers {
  onDelete: (tconst: string) => void;
  onDeleteReview: (tconst: string) => void;
  onWatchedChange: () => void;
}

export const buildColumns = ({ onDelete, onDeleteReview, onWatchedChange }: ColumnHandlers): Column<FavoriteEntry>[] => [
  {
    key: 'poster',
    label: 'Image',
    render: entry => (entry.poster_url ? <S.Poster src={entry.poster_url} alt={entry.primaryTitle} loading='lazy' /> : null),
    style: { minWidth: '75px', width: '10%' },
  },
  {
    key: 'primaryTitle',
    label: 'Title',
    render: entry => <Link to={ROUTES.favorite(entry.tconst)}>{entry.primaryTitle}</Link>,
    sort: true,
    style: { minWidth: '200px', width: '35%' },
  },
  {
    key: 'startYear',
    label: 'Ano',
    sort: true,
    style: { minWidth: '70px', width: '7%' },
  },
  {
    key: 'watched',
    label: 'Assistido',
    render: entry => <WatchedTag tconst={entry.tconst} watched={entry.watched} onUpdate={onWatchedChange} />,
    sort: true,
    style: { minWidth: '100px', width: '10%' },
  },
  {
    key: 'review',
    label: 'Review',
    render: entry => (entry.hasReview ? <Link to={ROUTES.review(entry.tconst)}>ver</Link> : null),
    style: { minWidth: '80px', width: '10%' },
  },
  {
    key: 'deleteReview',
    label: 'Excluir review',
    render: entry =>
      entry.hasReview ? (
        <IconButton icon={FaTrash} onClick={() => onDeleteReview(entry.tconst)} title='Deletar review' />
      ) : null,
    style: { minWidth: '50px', width: '5%' },
  },
  {
    key: 'delete',
    label: 'Excluir favorito',
    render: entry => (
      <IconButton icon={FaTrash} onClick={() => onDelete(entry.tconst)} title='Deletar favorito' />
    ),
    style: { minWidth: '50px', width: '3%' },
  },
];
