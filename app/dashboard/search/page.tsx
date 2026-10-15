import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import { ROUTES } from '../../const';
import { useStatusToast } from '../../hooks/useStatusToast';
import Button from '../../ui/Button';
import { Row } from '../../ui/Layout';
import LoadingModal from '../../ui/LoadingModal';
import PageHeader from '../../ui/PageHeader';
import { addFavorite, resetAddStatus } from './reducer/searchSlice';
import * as S from './styles';

export default function SearchPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { addStatus, error } = useAppSelector(state => state.search);
  const [tconst, setTconst] = useState('');

  const isLoading = addStatus === 'loading';

  const handleAdd = () => {
    if (!tconst || isLoading) return;
    dispatch(addFavorite(tconst));
  };

  useStatusToast({
    error,
    errorMessage: 'Não foi possível adicionar o filme na coleção.',
    onSuccess: () => navigate(ROUTES.favorites),
    reset: () => dispatch(resetAddStatus()),
    status: addStatus,
    successMessage: 'Filme adicionado aos favoritos.',
  });

  return (
    <div>
      <PageHeader title='Adicionar filme na coleção' />
      <Row>
        <S.TconstInput
          type='text'
          value={tconst}
          onChange={e => setTconst(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
          placeholder='Informe o tconst do filme a ser adicionado (ex: tt0084805)'
          disabled={isLoading}
        />
        <Button onClick={handleAdd} disabled={!tconst} loading={isLoading}>
          Adicionar na coleção
        </Button>
      </Row>

      <LoadingModal isOpen={isLoading} message='Adicionando filme na coleção...' />
    </div>
  );
}
