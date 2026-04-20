import { useRouter } from 'next/navigation';

import { Container, CenterText } from './styles';

interface GoBackProps {
  centerText?: string;
  fallbackPath?: string;
  rightSlot?: React.ReactNode;
}

const GoBack: React.FC<GoBackProps> = ({ centerText, fallbackPath = '/dashboard/favorites', rightSlot }) => {
  const router = useRouter();

  return (
    <Container>
      <button onClick={() => router.push(fallbackPath)} role='button' tabIndex={0}>
        Voltar
      </button>
      <CenterText>{centerText}</CenterText>
      {rightSlot && <div style={{ marginLeft: 'auto' }}>{rightSlot}</div>}
    </Container>
  );
};

export default GoBack;
