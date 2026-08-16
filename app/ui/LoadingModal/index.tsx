import LoadingSpinner from '../LoadingSpinner';
import * as S from './styles';

interface LoadingModalProps {
  isOpen: boolean;
  message?: string;
}

export default function LoadingModal({ isOpen, message = 'Carregando...' }: LoadingModalProps) {
  if (!isOpen) return null;

  return (
    <S.Overlay>
      <S.Card>
        <LoadingSpinner />
        <span>{message}</span>
      </S.Card>
    </S.Overlay>
  );
}
