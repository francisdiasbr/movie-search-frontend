import { useState } from 'react';

import { editDetails } from '../../reducer/movieDetailsSlice';
import { useAppDispatch } from '../../../../../lib/hooks';
import { YES_NO } from '../../../../formatter';
import { useToastNotifications } from '../../../../hooks/useToastNotifications';

interface WatchedTagProps {
  onUpdate?: () => void;
  tconst: string;
  watched: boolean;
}

export default function WatchedTag({ onUpdate, tconst, watched }: WatchedTagProps) {
  const dispatch = useAppDispatch();
  const [isUpdating, setIsUpdating] = useState(false);
  const { showSuccess, showError } = useToastNotifications();

  const handleClick = async () => {
    if (isUpdating) return;

    try {
      setIsUpdating(true);

      // O backend só grava os campos enviados, então não é preciso reenviar o
      // resto do documento para preservá-lo.
      const editAction = await dispatch(editDetails({ tconst, watched: !watched }));

      if (editDetails.fulfilled.match(editAction)) {
        showSuccess({ title: `Status atualizado para ${!watched ? 'assistido' : 'não assistido'}.`, duration: 2000 });
        onUpdate?.();
      } else {
        showError({ title: 'Não foi possível atualizar o status.' });
      }
    } catch (error) {
      showError({ title: 'Ocorreu um erro ao atualizar.' });
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
      {YES_NO(watched)}
    </span>
  );
}
