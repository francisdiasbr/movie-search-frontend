import React from 'react';

interface MediaCardProps {
  spotifyUrl: string;
}

const MediaCard = ({ spotifyUrl }: MediaCardProps) => {
  const getSpotifyEmbedUrl = (url: string) => {
    if (!url) return null;
    
    // Remove trailing slash if exists
    const cleanUrl = url.endsWith('/') ? url.slice(0, -1) : url;
    
    // Extract type and id from URL
    const parts = cleanUrl.split('/');
    const type = parts[parts.length - 2]; // album, playlist, artist, etc
    const id = parts[parts.length - 1];
    
    return `https://open.spotify.com/embed/${type}/${id}`;
  };

  const embedUrl = getSpotifyEmbedUrl(spotifyUrl);

  return (
    <div style={{ height: '500px', width: '100%', display: 'flex' }}>
      {embedUrl && (
        <iframe
          allow='encrypted-media'
          height='100%'
          src={embedUrl}
          style={{ flex: '1', border: 'none' }}
          title='Spotify player'
        />
      )}
    </div>
  );
};

export default MediaCard;
