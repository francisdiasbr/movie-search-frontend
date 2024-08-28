import React from "react";

import GenericCard from "../GenericCard";

interface PlotCardProps {
  plot: string;
}

const PlotCard = ({plot}: PlotCardProps) => {
  
  return (
    <GenericCard>
      <p>Plot</p>
      <div>{plot}</div>
    </GenericCard>
  )
}

export default PlotCard