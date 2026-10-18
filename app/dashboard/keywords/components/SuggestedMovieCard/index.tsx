import { FaRegStar, FaStar } from 'react-icons/fa';

import ExternalLink from '../../../../ui/ExternalLink';
import IconButton from '../../../../ui/IconButton';
import { imdbTitleUrl } from '../../../../util/url';
import { SuggestedMovie } from '../../types';
import * as S from './styles';

interface SuggestedMovieCardProps {
  // Already in the collection: filled star instead of the add button.
  collected: boolean;
  loading: boolean;
  movie: SuggestedMovie;
  onCollect: (tconst: string) => void;
}

const SuggestedMovieCard = ({ collected, loading, movie, onCollect }: SuggestedMovieCardProps) => (
  <S.Card>
    <S.Title>
      {collected ? (
        <S.Collected aria-label='Na coleção' title='Na coleção'>
          <FaStar />
        </S.Collected>
      ) : (
        <IconButton
          icon={FaRegStar}
          loading={loading}
          onClick={() => onCollect(movie.tconst)}
          title='Adicionar na coleção'
        />
      )}
      <strong>
        <ExternalLink href={imdbTitleUrl(movie.tconst)}>{movie.original_title ?? movie.title}</ExternalLink>
      </strong>
      <span>({movie.year})</span>
      {movie.original_title && movie.original_title !== movie.title && <span>· {movie.title}</span>}
    </S.Title>
    {movie.genres && movie.genres.length > 0 && (
      <S.Genres>
        {movie.genres.map(genre => (
          <S.Genre key={genre}>{genre}</S.Genre>
        ))}
      </S.Genres>
    )}
    {movie.description && <S.Description>{movie.description}</S.Description>}
    {movie.relevance && <S.Relevance>{movie.relevance}</S.Relevance>}
  </S.Card>
);

export default SuggestedMovieCard;
