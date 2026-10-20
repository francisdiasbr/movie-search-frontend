import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { useAppDispatch } from '../../../../../lib/hooks';
import { WATCHED_LABEL } from '../../../../formatter';
import { useAsyncAction } from '../../../../hooks/useAsyncAction';
import { useToastNotifications } from '../../../../hooks/useToastNotifications';
import { editDetails } from '../../reducer/movieDetailsSlice';
import * as S from './styles';

interface WatchedTagProps {
  onUpdate?: () => void;
  tconst: string;
  watched: boolean;
}

export default function WatchedTag({ onUpdate, tconst, watched }: WatchedTagProps) {
  const dispatch = useAppDispatch();
  const { showSuccess, showError } = useToastNotifications();

  // The backend only writes the fields it receives, so the rest of the
  // document does not need to be resent.
  const { loading: isUpdating, run: handleClick } = useAsyncAction(async () => {
    const editAction = await dispatch(editDetails({ tconst, watched: !watched }));

    if (editDetails.fulfilled.match(editAction)) {
      showSuccess({ title: `Status atualizado para ${WATCHED_LABEL(!watched)}.`, duration: 2000 });
      onUpdate?.();
    } else {
      showError({ title: 'Não foi possível atualizar o status.' });
    }
  });

  const Icon = watched ? FaEye : FaEyeSlash;

  return (
    <S.Toggle
      $busy={isUpdating}
      $watched={watched}
      aria-pressed={watched}
      disabled={isUpdating}
      onClick={() => handleClick()}
      title={isUpdating ? 'Atualizando...' : `Marcar como ${WATCHED_LABEL(!watched)}`}
      type='button'
    >
      <Icon size={12} />
      {watched ? 'Assistido' : 'Não assistido'}
    </S.Toggle>
  );
}
