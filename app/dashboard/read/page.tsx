import { useEffect } from 'react';

import * as S from './styles';
import { useBlogPosts } from './useBlogPosts';

export default function ReadPage() {
  const { allEntries, loading, handleSearch, handleCardClick } = useBlogPosts();


  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div>
      <h2>Resenhas</h2>
      {loading && <div>Carregando...</div>}
      {!loading && allEntries.length === 0 && <p>Nenhuma resenha encontrada.</p>}
      {allEntries.map((entry) => (
        <S.EntryCard key={entry.tconst} onClick={() => handleCardClick(entry.tconst)}>
          <strong>{entry.primaryTitle || entry.tconst}</strong>
        </S.EntryCard>
      ))}
    </div>
  );
}
