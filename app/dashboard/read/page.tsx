'use client';

import { useEffect } from 'react';

import { useBlogPosts } from '../../hooks/useBlogPosts';

export default function ReadPage() {
  const { allEntries, loading, handleSearch, handleCardClick } = useBlogPosts();

  console.log('All entries:', allEntries);
  console.log('Loading state:', loading);
  console.log('Handle search function:', handleSearch);
  console.log('Handle card click function:', handleCardClick);
  
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
          <span style={{ color: '#737373', fontSize: '0.875rem', marginLeft: '12px' }}>
            {entry.isAiGenerated ? 'IA' : 'Autoral'}
          </span>
        </div>
      ))}
    </div>
  );
}
