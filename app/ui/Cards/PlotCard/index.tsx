import React from 'react';

import GenericCard from '../GenericCard';

interface PlotCardProps {
  review?: string;
}

const PlotCard = ({ review }: PlotCardProps) => {
  return (
    <GenericCard>
      <p>Plot</p>
      <div>{review}</div>
    </GenericCard>
  );
};

export default PlotCard;
