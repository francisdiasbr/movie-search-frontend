import React from 'react';

interface ReviewCardProps {
  originalTitle: string;
  plot?: string;
  review: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ originalTitle, plot, review }) => {
  return (
    <div
      style={{
        backgroundColor: 'white',
        border: '1px solid #e5e5e5',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        marginBottom: '16px',
        overflow: 'hidden',
        padding: '24px',
      }}
    >
      <p style={{ fontWeight: 'bold', fontSize: '1.125rem', marginBottom: '8px' }}>{originalTitle}</p>
      <p style={{ fontSize: '1rem', marginBottom: '16px' }}>{review}</p>
      <p style={{ color: '#525252', fontSize: '0.875rem' }}>{plot}</p>
    </div>
  );
};

export default ReviewCard;
