import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { addFavorite, resetAddStatus } from '../../../lib/features/movie/movieDetailsSlice';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import { useToastNotifications } from '../../hooks/useToastNotifications';

export default function SearchPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { addStatus } = useAppSelector(state => state.moviesDetails);
  const { showSuccess, showError } = useToastNotifications();
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

  useEffect(() => {
    if (addStatus === 'succeeded') {
      showSuccess({ title: 'Filme adicionado aos favoritos.' });
      dispatch(resetAddStatus());
      navigate('/dashboard/favorites');
    } else if (addStatus === 'failed') {
      showError({ title: 'Filme já está na lista de favoritos.' });
      dispatch(resetAddStatus());
    }
  }, [addStatus, dispatch]);

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
    </div>
  );
}
