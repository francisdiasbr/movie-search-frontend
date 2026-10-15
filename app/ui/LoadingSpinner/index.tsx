import * as S from './styles';

interface LoadingSpinnerProps {
  color?: string;
  size?: string;
  speed?: string;
  thickness?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  color,
  size = '40px',
  speed = '0.65s',
  thickness = '4px',
}) => {
  return (
    <S.SpinnerContainer>
      <S.Spinner $color={color} $size={size} $speed={speed} $thickness={thickness} />
    </S.SpinnerContainer>
  );
};

export default LoadingSpinner;
