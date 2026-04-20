'use client';

import * as S from './styles';

interface LoadingSpinnerProps {
  color?: string;
  size?: string;
  speed?: string;
  thickness?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  color = '#2D2A26',
  size = '40px',
  speed = '0.65s',
  thickness = '4px',
}) => {
  return (
    <S.SpinnerContainer>
      <div
        style={{
          animation: `spin ${speed} linear infinite`,
          border: `${thickness} solid #e5e5e5`,
          borderRadius: '50%',
          borderTopColor: color,
          height: size,
          width: size,
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </S.SpinnerContainer>
  );
};

export default LoadingSpinner;
