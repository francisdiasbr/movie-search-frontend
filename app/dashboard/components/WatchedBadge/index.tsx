import { FaEye, FaEyeSlash } from 'react-icons/fa';

import * as S from './styles';

interface WatchedBadgeProps {
  busy?: boolean;
  // Gender of the noun: "Assistido" for a movie, "Assistida" for a series.
  feminine?: boolean;
  onClick: () => void;
  watched: boolean;
}

// The "watched / not watched" pill-button of the lists. Only looks; each
// list decides what clicking it does.
const WatchedBadge = ({ busy = false, feminine = false, onClick, watched }: WatchedBadgeProps) => {
  const Icon = watched ? FaEye : FaEyeSlash;
  const label = feminine ? 'Assistida' : 'Assistido';

  return (
    <S.Toggle
      $busy={busy}
      $watched={watched}
      aria-pressed={watched}
      disabled={busy}
      onClick={onClick}
      title={busy ? 'Atualizando...' : `Marcar como ${watched ? 'não ' : ''}${label.toLowerCase()}`}
      type='button'
    >
      <Icon size={12} />
      {watched ? label : `Não ${label.toLowerCase()}`}
    </S.Toggle>
  );
};

export default WatchedBadge;
