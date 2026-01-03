'use client';

import { Spinner, Box } from '@chakra-ui/react';

import * as S from './styles';

interface LoadingSpinnerProps {
  size?: string;
  color?: string;
  thickness?: string;
  speed?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'xl',
  color = '#2D2A26',
  thickness = '4px',
  speed = '0.65s',
}) => {
  return (
    <S.SpinnerContainer>
      <Spinner
        size={size}
        color={color}
        thickness={thickness}
        speed={speed}
        emptyColor="gray.200"
      />
    </S.SpinnerContainer>
  );
};

export default LoadingSpinner;

