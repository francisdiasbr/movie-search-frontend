import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { ROUTES } from '../../const';
import { useAsyncAction } from '../../hooks/useAsyncAction';
import { useToastNotifications } from '../../hooks/useToastNotifications';
import Button from '../../ui/Button';
import { Row } from '../../ui/Layout';
import PageHeader from '../../ui/PageHeader';
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
      <PageHeader title='Escrever resenha' description='Insira o tconst do filme e escolha como criar a resenha.' />
      <Row>
        <input
          type='text'
          value={tconst}
          onChange={e => setTconst(e.target.value.trim())}
          onKeyDown={e => e.key === 'Enter' && handleWriteAuthoral()}
          placeholder='Ex: tt0084805'
          disabled={isLoading}
        />
        <Button onClick={() => handleWriteAuthoral()} disabled={!tconst} loading={isLoading}>
          Escrever
        </Button>
      </Row>
    </div>
  );
}
