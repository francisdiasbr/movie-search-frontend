import { useEffect } from 'react';

import { useBlogPosts } from '../useBlogPosts';

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
        <div
          key={entry.tconst}
          onClick={() => handleCardClick(entry.tconst)}
          style={{
            border: '1px solid #e5e5e5',
            borderRadius: '8px',
            cursor: 'pointer',
            marginBottom: '12px',
            padding: '16px',
          }}
        >
          <strong>{entry.primaryTitle || entry.tconst}</strong>
        </div>
      ))}
    </div>
  );
}
