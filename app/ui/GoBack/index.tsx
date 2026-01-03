import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

import { Container, CenterText } from './styles';

interface GoBackProps {
  centerText?: string;
  rightSlot?: React.ReactNode;
  fallbackPath?: string;
}

const GoBack: React.FC<GoBackProps> = ({ centerText, rightSlot, fallbackPath = '/dashboard/favorites' }) => {
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
