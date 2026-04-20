import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

import { Container, CenterText } from './styles';

interface GoBackProps {
  centerText?: string;
  fallbackPath?: string;
  rightSlot?: React.ReactNode;
}

const GoBack: React.FC<GoBackProps> = ({ centerText, fallbackPath = '/dashboard/favorites', rightSlot }) => {
  const router = useRouter();

  const handleGoBack = () => {
    // Sempre usa router.push para navegação explícita
    // Isso evita recarregamentos e mantém o estado
    router.push(fallbackPath);
  };

  return (
    <Container>
      <Button
        onClick={handleGoBack}
        role='button'
        tabIndex={0}
      >
        Voltar
      </Button>
      <CenterText>{centerText}</CenterText>
      {rightSlot && <div style={{ marginLeft: 'auto' }}>{rightSlot}</div>}
    </Container>
  );
};

export default GoBack;
