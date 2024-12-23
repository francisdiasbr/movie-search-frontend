import React from 'react';

import GenericCard from '../GenericCard';

interface TriviaCardProps {
  trivia: any;
}

const TriviaCard = ({ trivia }: TriviaCardProps) => {
  return (
    <GenericCard>
      <p>Trivia</p>
      <div>{trivia}</div>
    </GenericCard>
  );
};

export default TriviaCard;
