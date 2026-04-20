'use client';

import { Spinner, Box } from '@chakra-ui/react';

import * as S from './styles';

interface LoadingSpinnerProps {
  color?: string;
  size?: string;
  speed?: string;
  thickness?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  color = '#2D2A26',
  size = 'xl',
  speed = '0.65s',
  thickness = '4px',
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

