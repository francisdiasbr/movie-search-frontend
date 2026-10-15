import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import { ROUTES } from '../../const';
import { useStatusToast } from '../../hooks/useStatusToast';
import LoadingModal from '../../ui/LoadingModal';
import { addFavorite, resetAddStatus } from './reducer/searchSlice';

export default function SearchPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { addStatus, error } = useAppSelector(state => state.search);
  const [isLoading, setIsLoading] = useState(false);
  const [tconst, setTconst] = useState('');

  const handleAdd = (tconst: string) => {
    if (!tconst || isLoading) return;
    setIsLoading(true);
    dispatch(addFavorite(tconst))
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAdd(tconst);
    }
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
      <h2>Adicionar filme na coleção</h2>
      <div style={{ display: 'flex', gap: '8px' }}>
        <input
          type="text"
          value={tconst}
          onChange={(e) => setTconst(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Informe o tconst do filme a ser adicionado (ex: tt0084805)"
          disabled={isLoading}
          style={{ width: '460px' }}
        />
        <button
          onClick={() => handleAdd(tconst)}
          disabled={isLoading || !tconst}
        >
          {isLoading ? 'Adicionando' : 'Adicionar na coleção'}
        </button>
      </div>

      <LoadingModal isOpen={isLoading} message='Adicionando filme na coleção...' />
    </div>
  );
}
