import Image from 'next/image';
import React from 'react';

import GenericCard from '../GenericCard';

interface ImagesCardProps {
  poster: string;
  tconst: string;
}

const ImagesCard = ({ poster, tconst }: ImagesCardProps) => {
  const posterUrl = poster ? poster : `https://m.imdb.com/${tconst}/${poster}`;

  return (
    <GenericCard>
      <Image
        src={posterUrl}
        alt='Descrição da imagem'
        width={500}
        height={500}
      />
    </GenericCard>
  );
};

export default ImagesCard;
