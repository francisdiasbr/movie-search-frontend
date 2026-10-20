import { NOT_AVAILABLE } from '../../formatter';
import ExternalLink from '../../ui/ExternalLink';
import { Column } from '../../ui/Table';
import { imdbTitleUrl } from '../../util/url';
import { RecentMovie } from './types';

export const columns: Column<RecentMovie>[] = [
  {
    key: 'title',
    label: 'Filme',
    sort: true,
    style: { width: '80%' },
  },
  {
    key: 'imdb_rating',
    label: 'Nota IMDb',
    render: movie =>
      movie.tconst && movie.imdb_rating !== null ? (
        <ExternalLink href={imdbTitleUrl(movie.tconst)}>{movie.imdb_rating.toFixed(1)}</ExternalLink>
      ) : (
        NOT_AVAILABLE(movie.imdb_rating)
      ),
    sort: true,
    style: { width: '20%' },
  },
];
