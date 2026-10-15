import { editDetails } from '../../reducer/movieDetailsSlice';
import { useAppDispatch } from '../../../../../lib/hooks';
import { WATCHED_LABEL, YES_NO } from '../../../../formatter';
import { useAsyncAction } from '../../../../hooks/useAsyncAction';
import { useToastNotifications } from '../../../../hooks/useToastNotifications';

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
