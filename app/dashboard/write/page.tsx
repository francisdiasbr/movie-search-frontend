import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { clearState, fetchAuthoralReview } from '../reviews/reducer/authoralReviewSlice';
import { fetchDetails } from '../favorites/reducer/movieDetailsSlice';
import { useAppDispatch } from '../../../lib/hooks';
import { useToastNotifications } from '../../hooks/useToastNotifications';

export default function WritePage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { showWarning, showError } = useToastNotifications();
  const [tconst, setTconst] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleWriteAuthoral = async () => {
    if (!tconst) return;
    setIsLoading(true);
    try {
      const authoralAction = await dispatch(fetchAuthoralReview(tconst));
      if (fetchAuthoralReview.fulfilled.match(authoralAction) && authoralAction.payload) {
        showWarning({ title: 'Já existe uma resenha para este filme.' });
        return;
      }

      const detailsAction = await dispatch(fetchDetails(tconst));
      const primaryTitle = fetchDetails.fulfilled.match(detailsAction)
        ? detailsAction.payload?.primaryTitle || ''
        : '';

      dispatch(clearState());
      navigate(`/dashboard/write-review?tconst=${tconst}&primaryTitle=${encodeURIComponent(primaryTitle)}`);
    } catch {
      showError({ title: 'Erro ao verificar resenhas.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Escrever resenha</h2>
      <p>Insira o tconst do filme e escolha como criar a resenha.</p>
      <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
        <input
          type='text'
          value={tconst}
          onChange={(e) => setTconst(e.target.value.trim())}
          placeholder='Ex: tt0084805'
          disabled={isLoading}
        />
        <button onClick={handleWriteAuthoral} disabled={isLoading || !tconst}>
          {isLoading ? 'Adicionando' : 'Escrever'}
        </button>
      </div>
    </div>
  );
}
