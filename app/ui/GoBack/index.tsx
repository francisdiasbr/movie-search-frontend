import { useRouter } from 'next/navigation';
import { Container, CenterText } from './styles';
import { Button } from '@chakra-ui/react';

interface GoBackProps {
  centerText?: string;
}

const GoBack: React.FC<GoBackProps> = ({ centerText }) => {
  const router = useRouter();

  return (
    <Container>
      <Button
        onClick={() => router.back()}
        role='button'
        tabIndex={0}
      >
        Voltar
      </Button>
      <CenterText>{centerText}</CenterText>
    </Container>
  );
};

export default GoBack;
