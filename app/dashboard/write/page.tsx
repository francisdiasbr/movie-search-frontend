import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { ROUTES } from '../../const';
import { useAsyncAction } from '../../hooks/useAsyncAction';
import { useToastNotifications } from '../../hooks/useToastNotifications';
import writeService from './service/WriteService';

export default function WritePage() {
  const navigate = useNavigate();
  const { showWarning, showError } = useToastNotifications();
  const [tconst, setTconst] = useState('');

  const { loading: isLoading, run: handleWriteAuthoral } = useAsyncAction(async () => {
    if (!tconst) return;
    try {
      const existingReview = await writeService.findReview(tconst);
      if (existingReview) {
        showWarning({ title: 'Já existe uma resenha para este filme.' });
        return;
      }

      const primaryTitle = await writeService.getMovieTitle(tconst).catch(() => '');
      navigate(ROUTES.writeReview({ primaryTitle, tconst }));
    } catch {
      showError({ title: 'Erro ao verificar resenhas.' });
    }
  });

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
