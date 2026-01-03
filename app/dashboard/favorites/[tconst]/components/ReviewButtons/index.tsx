import { Button } from '@chakra-ui/react';
import { FaBook, FaRobot, FaPen } from 'react-icons/fa';
import * as S from './styles';

interface ReviewButtonsProps {
  watched: boolean;
  isGeneratingBlogPost: boolean;
  onCheckReviewType: (tconst: string) => void;
  onCreateBlogPost: () => void;
  onCreateAuthoralReview: () => void;
  tconst: string;
}

export default function ReviewButtons({
  watched,
  isGeneratingBlogPost,
  onCheckReviewType,
  onCreateBlogPost,
  onCreateAuthoralReview,
  tconst
}: ReviewButtonsProps) {
  if (!watched) {
    return null;
  }

  return (
    <S.Container>
      <Button
        leftIcon={<FaBook />}
        onClick={() => onCheckReviewType(tconst)}
        size="md"
        width={{ base: '100%', md: 'auto' }}
      >
        Ver a resenha
      </Button>
      <Button
        leftIcon={<FaRobot />}
        onClick={onCreateBlogPost}
        size="md"
        isLoading={isGeneratingBlogPost}
        spinnerPlacement='end'
        loadingText='Gerando resenha'
        width={{ base: '100%', md: 'auto' }}
      >
        Gerar uma resenha com IA
      </Button>
      <Button
        leftIcon={<FaPen />}
        onClick={onCreateAuthoralReview}
        size="md"
        width={{ base: '100%', md: 'auto' }}
      >
        Escrever uma resenha
      </Button>
    </S.Container>
  );
}

