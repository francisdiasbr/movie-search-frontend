import { FaBook, FaRobot, FaPen } from 'react-icons/fa';

import * as S from './styles';

interface ReviewButtonsProps {
  isGeneratingBlogPost: boolean;
  onCheckReviewType: (tconst: string) => void;
  onCreateAuthoralReview: () => void;
  onCreateBlogPost: () => void;
  tconst: string;
  watched: boolean;
}

export default function ReviewButtons({
  isGeneratingBlogPost,
  onCheckReviewType,
  onCreateAuthoralReview,
  onCreateBlogPost,
  tconst,
  watched,
}: ReviewButtonsProps) {
  if (!watched) return null;

  return (
    <S.Container>
      <button onClick={() => onCheckReviewType(tconst)}>
        <FaBook /> Ver a resenha
      </button>
      <button onClick={onCreateBlogPost} disabled={isGeneratingBlogPost}>
        <FaRobot /> {isGeneratingBlogPost ? 'Gerando resenha...' : 'Gerar uma resenha com IA'}
      </button>
      <button onClick={onCreateAuthoralReview}>
        <FaPen /> Escrever uma resenha
      </button>
    </S.Container>
  );
}
