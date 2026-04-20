'use client';

import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { addFavorite, resetAddStatus } from '../../../lib/features/movie/movieDetailsSlice';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';

export default function SearchPage() {
  const dispatch = useAppDispatch();
  const { addStatus } = useAppSelector(state => state.moviesDetails);
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
      toast.success('Filme adicionado aos favoritos.');
      setTconst('');
      dispatch(resetAddStatus());
    } else if (addStatus === 'failed') {
      toast.error('Filme já está na lista de favoritos.');
      dispatch(resetAddStatus());
    }
  }, [addStatus, toast, dispatch]);

  return (
    <div>
      <h2>Adicionar Filme aos Favoritos</h2>
        <input
          type="text"
          value={tconst}
          onChange={(e) => setTconst(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Informe o tconst do filme a ser adicionado (ex: tt0084805)"
          disabled={isLoading}
        />
        <button
          onClick={() => handleAdd(tconst)}
          disabled={isLoading || !tconst}
        >
          Adicionar na coleção
        </button>
    </div>
  );
}
