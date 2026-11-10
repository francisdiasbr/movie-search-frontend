import { FaTrash } from 'react-icons/fa';

import { NOT_AVAILABLE } from '../../formatter';
import { Column } from '../../ui/Table';
import { imdbTitleUrl } from '../../util/url';
import WatchedBadge from '../components/WatchedBadge';
import * as S from './styles';
import { SeriesEntry } from './types';

interface ColumnHandlers {
  onDelete: (entry: SeriesEntry) => void;
  onWatchedChange: (entry: SeriesEntry, watched: boolean) => void;
}

// "1993–1999", or "2021–" while the series is still on air.
const years = (entry: SeriesEntry) =>
  entry.startYear ? `${entry.startYear}–${entry.endYear ?? ''}` : NOT_AVAILABLE(entry.startYear);

export const buildColumns = ({ onDelete, onWatchedChange }: ColumnHandlers): Column<SeriesEntry>[] => [
  {
    key: 'poster',
    label: 'Pôster',
    render: entry => (entry.poster_url ? <S.Poster alt={entry.primaryTitle} loading='lazy' src={entry.poster_url} /> : null),
    style: { minWidth: '75px', width: '8%' },
  },
  {
    key: 'primaryTitle',
    label: 'Título',
    render: entry => (
      <S.TitleCell>
        <S.TitleLink href={imdbTitleUrl(entry.tconst)} rel='noopener noreferrer' target='_blank'>
          {entry.primaryTitle}
        </S.TitleLink>
        {entry.title_pt && entry.title_pt !== entry.primaryTitle && <S.TitlePt lang='pt-BR'>{entry.title_pt}</S.TitlePt>}
        {entry.genres.length > 0 && <S.Genres>{entry.genres.join(' · ')}</S.Genres>}
      </S.TitleCell>
    ),
    sort: true,
    style: { minWidth: '220px', textAlign: 'left', width: '37%' },
  },
  {
    key: 'startYear',
    label: 'Anos',
    render: years,
    sort: true,
    style: { minWidth: '110px', width: '12%' },
  },
  {
    key: 'seasons',
    label: 'Temporadas',
    render: entry => `${entry.seasons} (${entry.episodes} ep.)`,
    sort: true,
    style: { minWidth: '130px', width: '13%' },
  },
  {
    key: 'imdb_rating',
    label: 'Nota IMDb',
    render: entry =>
      entry.imdb_rating !== null ? (
        <S.Rating href={imdbTitleUrl(entry.tconst)} rel='noopener noreferrer' target='_blank'>
          {entry.imdb_rating.toFixed(1)}
        </S.Rating>
      ) : (
        NOT_AVAILABLE(entry.imdb_rating)
      ),
    sort: true,
    style: { minWidth: '100px', width: '10%' },
  },
  {
    key: 'watched',
    label: 'Assistida',
    render: entry => (
      <WatchedBadge feminine onClick={() => onWatchedChange(entry, !entry.watched)} watched={entry.watched} />
    ),
    sort: true,
    style: { minWidth: '150px', width: '12%' },
  },
  {
    key: 'actions',
    label: 'Ações',
    render: entry => (
      <S.Actions>
        <S.DangerIconButton icon={FaTrash} onClick={() => onDelete(entry)} title='Excluir série' />
      </S.Actions>
    ),
    style: { minWidth: '80px', width: '8%' },
  },
];
