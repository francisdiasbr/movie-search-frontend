import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import Button from '../../../ui/Button';
import * as S from './styles';

interface GoBackProps {
  /** Route to go to. Falls back to the browser history when omitted. */
  to?: string;
}

const GoBack = ({ to }: GoBackProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) navigate(to);
    else navigate(-1);
  };

  return (
    <S.Wrapper>
      <Button iconLeft={FaArrowLeft} onClick={handleClick} variant='outline'>
        Voltar
      </Button>
    </S.Wrapper>
  );
};

export default GoBack;
