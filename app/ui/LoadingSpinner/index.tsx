import * as S from './styles';

interface LoadingSpinnerProps {
  color?: string;
  inline?: boolean;
  size?: string;
  speed?: string;
  thickness?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  color,
  inline = false,
  size = '40px',
  speed = '0.65s',
  thickness = '4px',
}) => {
  return (
    <S.SpinnerContainer $inline={inline}>
      <S.Spinner $color={color} $size={size} $speed={speed} $thickness={thickness} />
    </S.SpinnerContainer>
  );
};

export default LoadingSpinner;
