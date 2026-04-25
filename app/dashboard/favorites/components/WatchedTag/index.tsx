'use client';

import { toast } from 'sonner';
import { useState } from 'react';

import { editDetails, fetchDetails } from '../../../../../lib/features/movie/movieDetailsSlice';
import { useAppDispatch } from '../../../../../lib/hooks';

interface WatchedTagProps {
  onUpdate?: () => void;
  tconst: string;
  watched: boolean;
}

export default function WatchedTag({ onUpdate, tconst, watched }: WatchedTagProps) {
  const dispatch = useAppDispatch();
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
          magnet_link: movieData.magnet_link || '',
          references: movieData.references || [],
          soundtrack: movieData.soundtrack || '',
          tconst: movieData.tconst,
          watched: !watched,
          wiki: movieData.wiki || '',
        };

        const editAction = await dispatch(editDetails(updateData));
        
        if (editDetails.fulfilled.match(editAction)) {
          toast.success(`Status atualizado para ${!watched ? 'assistido' : 'não assistido'}.`, { duration: 2000 });

          if (onUpdate) {
            onUpdate();
          }
        } else {
          toast.error('Não foi possível atualizar o status.');
        }
      } else {
        toast.error('Não foi possível carregar os dados do filme.');
      }
    } catch (error) {
      toast.error('Ocorreu um erro ao atualizar.');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <span
      style={{
        cursor: isUpdating ? 'not-allowed' : 'pointer',
        opacity: isUpdating ? 0.6 : 1,
      }}
      onClick={handleClick}
      title={isUpdating ? 'Atualizando...' : 'Clique para alterar'}
    >
      {watched ? 'Sim' : 'Não'}
    </span>
  );
}

