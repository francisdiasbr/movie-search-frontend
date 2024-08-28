import React from "react";

import GenericCard from "../GenericCard";

interface MediaCardProps {
  spotifyUrl: string;

}

const MediaCard = ({spotifyUrl}: MediaCardProps) => {
  const spotifyId = spotifyUrl ? spotifyUrl.split('/').pop() : null;
  
  return (
    <div>
      <iframe
        allow='encrypted-media'
        height='100%'
        src={`https://open.spotify.com/embed/album/${spotifyId}`}
        style={{ display: 'flex', height: '620px', border: 'none', width: '100%' }}
        title='Spotify player'
        width='100%'
      />
    </div>
  )
}

export default MediaCard