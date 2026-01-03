'use client';

import { Tag } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { useState } from 'react';

import { editDetails, fetchDetails } from '../../../../../lib/features/movie/movieDetailsSlice';
import { useAppDispatch } from '../../../../../lib/hooks';

interface WatchedTagProps {
  tconst: string;
  watched: boolean;
  onUpdate?: () => void;
}

export default function WatchedTag({ tconst, watched, onUpdate }: WatchedTagProps) {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleClick = async () => {
    if (isUpdating) return;

    try {
      setIsUpdating(true);

      // Busca os detalhes completos do filme primeiro
      const fetchAction = await dispatch(fetchDetails(tconst));
      
      if (fetchDetails.fulfilled.match(fetchAction) && fetchAction.payload) {
        const movieData = fetchAction.payload;
        
        // Atualiza apenas o watched, mantendo os outros campos
        const updateData = {
          tconst: movieData.tconst,
          watched: !watched,
          soundtrack: movieData.soundtrack || '',
          wiki: movieData.wiki || '',
          references: movieData.references || [],
        };

        const editAction = await dispatch(editDetails(updateData));
        
        if (editDetails.fulfilled.match(editAction)) {
          toast({
            title: 'Sucesso',
            description: `Status atualizado para ${!watched ? 'assistido' : 'não assistido'}.`,
            status: 'success',
            duration: 2000,
            isClosable: true,
          });
          
          // Chama callback para atualizar a lista
          if (onUpdate) {
            onUpdate();
          }
        } else {
          toast({
            title: 'Erro',
            description: 'Não foi possível atualizar o status.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }
      } else {
        toast({
          title: 'Erro',
          description: 'Não foi possível carregar os dados do filme.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro ao atualizar.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Tag
      colorScheme={watched ? 'green' : 'red'}
      cursor={isUpdating ? 'not-allowed' : 'pointer'}
      opacity={isUpdating ? 0.6 : 1}
      onClick={handleClick}
      title={isUpdating ? 'Atualizando...' : 'Clique para alterar'}
    >
      {watched ? 'Sim' : 'Não'}
    </Tag>
  );
}

