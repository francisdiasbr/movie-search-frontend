import React from "react";

import GenericCard from "../GenericCard";

interface ImagesCardProps {
  poster: string;
  tconst: string;
}

const ImagesCard = ({poster}: ImagesCardProps) => {
  
  const posterUrl = poster ? poster : `https://m.imdb.com/${tconst}/${poster}`;
  
  return (
    <GenericCard>
      <img src={posterUrl} />
    </GenericCard>
  )
}

export default ImagesCard