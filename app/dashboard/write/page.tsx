import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'sonner';

import { fetchAuthoralReview } from '../../../lib/features/authoralReview/authoralReviewSlice';
import { fetchDetails } from '../../../lib/features/movie/movieDetailsSlice';
import { useAppDispatch } from '../../../lib/hooks';

export default function WritePage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [tconst, setTconst] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleWriteAuthoral = async () => {
    if (!tconst) return;
    setIsLoading(true);
    try {
      const authoralAction = await dispatch(fetchAuthoralReview(tconst));
      if (fetchAuthoralReview.fulfilled.match(authoralAction) && authoralAction.payload) {
        toast.warning('Já existe uma resenha para este filme.');
        return;
      }

      const detailsAction = await dispatch(fetchDetails(tconst));
      const primaryTitle = fetchDetails.fulfilled.match(detailsAction)
        ? detailsAction.payload?.primaryTitle || ''
        : '';

      navigate(`/dashboard/write-review?tconst=${tconst}&primaryTitle=${encodeURIComponent(primaryTitle)}`);
    } catch {
      toast.error('Erro ao verificar resenhas.');
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
          Escrever autoral
        </button>
      </div>
    </div>
  );
}
