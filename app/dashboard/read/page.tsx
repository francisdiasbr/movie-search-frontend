import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '../../const';
import LoadingSpinner from '../../ui/LoadingSpinner';
import PageHeader from '../../ui/PageHeader';
import * as S from './styles';
import { useReviews } from './useReviews';

export default function ReadPage() {
  const navigate = useNavigate();
  const { entries, load, status } = useReviews();

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div>
      <PageHeader title='Resenhas' />
      {status === 'loading' && <LoadingSpinner />}
      {status === 'failed' && <p>Não foi possível carregar as resenhas.</p>}
      {status === 'succeeded' && entries.length === 0 && <p>Nenhuma resenha encontrada.</p>}
      {entries.map(entry => (
        <S.EntryCard key={entry.tconst} onClick={() => navigate(ROUTES.review(entry.tconst))}>
          <strong>{entry.primaryTitle || entry.tconst}</strong>
        </S.EntryCard>
      ))}
    </div>
  );
}
