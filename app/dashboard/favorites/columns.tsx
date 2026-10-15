import { Link } from 'react-router-dom';

import { ROUTES } from '../../const';
import { Column } from '../../ui/Table';
import WatchedTag from './components/WatchedTag';
import { FavoriteEntry } from './types';
import * as S from './styles';

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
    style: { minWidth: '200px', width: '35%' },
  },
  {
    key: 'watched',
    label: 'Assistido',
    render: entry => <WatchedTag tconst={entry.tconst} watched={entry.watched} onUpdate={onWatchedChange} />,
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
        <S.LinkButton type='button' onClick={() => onDeleteReview(entry.tconst)} title='Deletar review'>
          x
        </S.LinkButton>
      ) : null,
    style: { minWidth: '50px', width: '5%' },
  },
  {
    key: 'delete',
    label: 'Excluir favorito',
    render: entry => (
      <S.LinkButton type='button' onClick={() => onDelete(entry.tconst)} title='Deletar'>
        x
      </S.LinkButton>
    ),
    style: { minWidth: '50px', width: '3%' },
  },
];
