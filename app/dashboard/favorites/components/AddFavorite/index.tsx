import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../../lib/hooks';
import { useStatusToast } from '../../../../hooks/useStatusToast';
import Button from '../../../../ui/Button';
import LoadingModal from '../../../../ui/LoadingModal';
import { addFavorite, resetAddStatus } from '../../reducer/favoritesSlice';
import * as S from './styles';

interface AddFavoriteProps {
  // Called after the movie is saved so the list below can be refreshed.
  onAdded: () => void;
}

const AddFavorite = ({ onAdded }: AddFavoriteProps) => {
  const dispatch = useAppDispatch();
  const { addStatus, error } = useAppSelector(state => state.favorites);
  const [tconst, setTconst] = useState('');

  const isLoading = addStatus === 'loading';

  const handleAdd = () => {
    if (!tconst || isLoading) return;
    dispatch(addFavorite(tconst.trim()));
  };

  useStatusToast({
    error,
    errorMessage: 'Não foi possível adicionar o filme na coleção.',
    onSuccess: () => {
      setTconst('');
      onAdded();
    },
    reset: () => dispatch(resetAddStatus()),
    status: addStatus,
    successMessage: 'Filme adicionado na coleção.',
  });

  return (
    <S.Container>
      <S.TconstInput
        disabled={isLoading}
        onChange={e => setTconst(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleAdd()}
        placeholder='Informe o tconst do filme a ser adicionado (ex: tt0084805)'
        type='text'
        value={tconst}
      />
      <Button disabled={!tconst} loading={isLoading} onClick={handleAdd}>
        Adicionar na coleção
      </Button>
      <LoadingModal isOpen={isLoading} message='Adicionando filme na coleção...' />
    </S.Container>
  );
};

export default AddFavorite;
