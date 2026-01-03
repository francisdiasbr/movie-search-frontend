'use client';

import { Button, Input, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import { addFavorite, resetAddStatus } from '../../../lib/features/movie/movieDetailsSlice';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';

export default function SearchPage() {
  const dispatch = useAppDispatch();
  const { addStatus } = useAppSelector(state => state.moviesDetails);
  const toast = useToast();

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
      toast({
        title: 'Sucesso',
        description: 'Filme adicionado aos favoritos.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setTconst('');
      dispatch(resetAddStatus());
    } else if (addStatus === 'failed') {
      toast({
        title: 'Erro ao adicionar',
        description: 'Filme já está na lista de favoritos.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      dispatch(resetAddStatus());
    }
  }, [addStatus, toast, dispatch]);

  return (
    <div>
      <h2>Adicionar Filme aos Favoritos</h2>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
        <Input
          type="text"
          value={tconst}
          onChange={(e) => setTconst(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Informe o tconst do filme a ser adicionado (ex: tt0084805)"
          disabled={isLoading}
          flex={1}
        />
        <Button
          colorScheme="neutral"
          onClick={() => handleAdd(tconst)}
          disabled={isLoading || !tconst}
          spinnerPlacement="end"
          isLoading={isLoading}
          loadingText="Adicionando..."
        >
          Adicionar na coleção
        </Button>
      </div>
    </div>
  );
}
