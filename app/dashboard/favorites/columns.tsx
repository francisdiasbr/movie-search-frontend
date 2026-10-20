import { FaBookOpen, FaTrash } from 'react-icons/fa';

import { ROUTES } from '../../const';
import IconButton from '../../ui/IconButton';
import { Column } from '../../ui/Table';
import WatchedTag from './components/WatchedTag';
import * as S from './styles';
import { FavoriteEntry } from './types';

interface ColumnHandlers {
  onDelete: (entry: FavoriteEntry) => void;
  onDeleteReview: (entry: FavoriteEntry) => void;
  onOpenReview: (entry: FavoriteEntry) => void;
  onWatchedChange: () => void;
}

export const buildColumns = ({
  onDelete,
  onDeleteReview,
  onOpenReview,
  onWatchedChange,
}: ColumnHandlers): Column<FavoriteEntry>[] => [
  {
    key: 'poster',
    label: 'Pôster',
    render: entry => (entry.poster_url ? <S.Poster src={entry.poster_url} alt={entry.primaryTitle} loading='lazy' /> : null),
    style: { minWidth: '75px', width: '10%' },
  },
  {
    key: 'primaryTitle',
    label: 'Título',
    render: entry => <S.TitleLink to={ROUTES.favorite(entry.tconst)}>{entry.primaryTitle}</S.TitleLink>,
    sort: true,
    style: { minWidth: '200px', width: '45%' },
  },
  {
    key: 'startYear',
    label: 'Ano',
    sort: true,
    style: { minWidth: '70px', width: '10%' },
  },
  {
    key: 'watched',
    label: 'Assistido',
    render: entry => <WatchedTag tconst={entry.tconst} watched={entry.watched} onUpdate={onWatchedChange} />,
    sort: true,
    style: { minWidth: '150px', width: '15%' },
  },
  {
    key: 'actions',
    label: 'Ações',
    render: entry => (
      <S.Actions>
        {entry.hasReview && (
          <>
            <IconButton icon={FaBookOpen} onClick={() => onOpenReview(entry)} title='Ler resenha' />
            <S.DangerIconButton icon={FaTrash} onClick={() => onDeleteReview(entry)} title='Excluir resenha' />
          </>
        )}
        <S.DangerIconButton icon={FaTrash} onClick={() => onDelete(entry)} title='Excluir favorito' />
      </S.Actions>
    ),
    style: { minWidth: '130px', width: '20%' },
  },
];
