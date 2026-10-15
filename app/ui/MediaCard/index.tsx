import { spotifyEmbedUrl } from '../../util/url';

interface MediaCardProps {
  spotifyUrl: string;
}

const MediaCard = ({ spotifyUrl }: MediaCardProps) => {
  const embedUrl = spotifyEmbedUrl(spotifyUrl);

  if (!embedUrl) return null;

  return (
    <div style={{ height: '500px', width: '100%', display: 'flex' }}>
      <iframe
        allow='encrypted-media'
        height='100%'
        src={embedUrl}
        style={{ flex: '1', border: 'none' }}
        title='Spotify player'
      />
    </div>
  );
};

export default MediaCard;
