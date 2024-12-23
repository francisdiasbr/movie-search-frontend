import React from 'react';

interface MediaCardProps {
  spotifyUrl: string;
}

const MediaCard = ({ spotifyUrl }: MediaCardProps) => {
  const spotifyId = spotifyUrl ? spotifyUrl.split('/').pop() : null;

  return (
    <div style={{ height: '500px', width: '100%', display: 'flex' }}>
      <iframe
        allow='encrypted-media'
        height='100%'
        src={`https://open.spotify.com/embed/album/${spotifyId}`}
        style={{ flex: '1', border: 'none' }}
        title='Spotify player'
      />
    </div>
  );
};

export default MediaCard;
