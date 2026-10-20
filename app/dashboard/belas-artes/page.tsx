import { useEffect } from 'react';

import PageHeader from '../../ui/PageHeader';
import Table from '../../ui/Table';
import { columns } from './columns';
import { useRecentlyAdded } from './useRecentlyAdded';

export default function BelasArtesPage() {
  const { load, movies, status } = useRecentlyAdded();

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div>
      <PageHeader
        description='Filmes adicionados recentemente ao Belas Artes à la Carte, com a nota do IMDb.'
        title='Belas Artes'
      />
      {status === 'failed' && <p>Não foi possível carregar os filmes do Belas Artes.</p>}
      {status !== 'failed' && (
        <Table columns={columns} entries={movies} isLoading={status === 'loading'} rowKey={movie => String(movie.id)} />
      )}
    </div>
  );
}
