import { spotifyEmbedUrl } from '../../util/url';
import * as S from './styles';

interface MediaCardProps {
  spotifyUrl: string;
}

const MediaCard = ({ spotifyUrl }: MediaCardProps) => {
  const embedUrl = spotifyEmbedUrl(spotifyUrl);

  if (!embedUrl) return null;

  return (
    <S.Player>
      <S.Frame allow='encrypted-media' height='100%' src={embedUrl} title='Spotify player' />
    </S.Player>
  );
};

export default MediaCard;
