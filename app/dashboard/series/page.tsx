import { useEffect, useMemo, useState } from 'react';
import { FaPlus } from 'react-icons/fa';

import { useAsyncAction } from '../../hooks/useAsyncAction';
import { useDebouncedEffect } from '../../hooks/useDebouncedEffect';
import Button from '../../ui/Button';
import ConfirmDialog from '../../ui/ConfirmDialog';
import PageHeader from '../../ui/PageHeader';
import Table from '../../ui/Table';
import AddTitleDialog from '../components/AddTitleDialog';
import { buildColumns } from './columns';
import * as S from './styles';
import { SeriesEntry } from './types';
import { useSeries } from './useSeries';

export default function SeriesPage() {
  const { add, load, remove, series, setWatched, status } = useSeries();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<SeriesEntry | null>(null);

  useEffect(() => {
    load();
  }, [load]);

  useDebouncedEffect(() => load(searchTerm), [searchTerm]);

  const { loading: isAdding, run: handleAdd } = useAsyncAction(async (tconst: string) => {
    if (await add(tconst)) setIsAddOpen(false);
  });

  const { loading: isDeleting, run: handleDelete } = useAsyncAction(async () => {
    if (!pendingDelete) return;
    await remove(pendingDelete);
    setPendingDelete(null);
  });

  const columns = useMemo(
    () => buildColumns({ onDelete: setPendingDelete, onWatchedChange: setWatched }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <>
      <PageHeader
        actions={
          <Button iconLeft={FaPlus} onClick={() => setIsAddOpen(true)}>
            Adicionar série
          </Button>
        }
        description={series.length ? `${series.length} séries na lista` : 'Séries de TV que você acompanha, com os dados do IMDb.'}
        title='Séries'
      />

      <S.SearchBar>
        <input
          onChange={e => setSearchTerm(e.target.value)}
          placeholder='Pesquisar por título'
          type='search'
          value={searchTerm}
        />
      </S.SearchBar>

      {isAddOpen && (
        <AddTitleDialog
          hint='É o código que aparece na URL da página da série no IMDb. Os dados vêm da API do IMDb em um instante.'
          isOpen={isAddOpen}
          loading={isAdding}
          onClose={() => setIsAddOpen(false)}
          onSubmit={handleAdd}
          title='Adicionar série'
        />
      )}

      <ConfirmDialog
        isOpen={pendingDelete !== null}
        loading={isDeleting}
        onCancel={() => setPendingDelete(null)}
        onConfirm={handleDelete}
        title='Excluir série'
      >
        Remover <strong>{pendingDelete?.primaryTitle}</strong> da lista? Essa ação não pode ser desfeita.
      </ConfirmDialog>

      {status === 'failed' ? (
        <p>Não foi possível carregar as séries.</p>
      ) : (
        <Table columns={columns} entries={series} isLoading={status === 'loading'} rowKey={entry => entry.tconst} />
      )}
    </>
  );
}
