import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { isApiError } from '../../../lib/api/errors';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import { ROUTES } from '../../const';
import { useAsyncAction } from '../../hooks/useAsyncAction';
import { useDebouncedEffect } from '../../hooks/useDebouncedEffect';
import { useStatusToast } from '../../hooks/useStatusToast';
import { useToastNotifications } from '../../hooks/useToastNotifications';
import ConfirmDialog from '../../ui/ConfirmDialog';
import PageHeader from '../../ui/PageHeader';
import Table from '../../ui/Table';
import { toSelectOptions } from '../../util/select';
import { buildColumns } from './columns';
import AddFavorite from './components/AddFavorite';
import Search, { SearchValues } from './components/Search';
import { fetchFavorites } from './reducer/favoritesSlice';
import { deleteFavorite, resetDeleteStatus } from './reducer/movieDetailsSlice';
import favoritesService from './service/FavoritesService';
import { FavoriteEntry } from './types';

const INITIAL_SEARCH: SearchValues = { searchTerm: '' };
const INITIAL_PAGE_SIZE = 10;

// A removal waiting for the user to confirm it in the dialog.
interface PendingRemoval {
  entry: FavoriteEntry;
  kind: 'favorite' | 'review';
}

export default function Page() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { countries, entries, total_documents, status, startYears } = useAppSelector(state => state.favorites);
  const { deleteStatus } = useAppSelector(state => state.favoriteDetails);
  const { showSuccess, showError, showInfo } = useToastNotifications();
  const [search, setSearch] = useState<SearchValues>(INITIAL_SEARCH);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(INITIAL_PAGE_SIZE);
  const [pending, setPending] = useState<PendingRemoval | null>(null);

  // A row action (delete, watched toggle) reloads the same page: the table
  // shows a spinner instead of the skeleton rows until that reload ends.
  const [isActionLoading, setIsActionLoading] = useState(false);

  const isLoading = status === 'loading';

  const handleSearch = () => {
    const { searchTerm, ...filters } = search;
    dispatch(fetchFavorites({ filters, page, pageSize, searchTerm }));
  };

  const reloadAfterAction = () => {
    setIsActionLoading(true);
    handleSearch();
  };

  useEffect(() => {
    if (status !== 'loading') setIsActionLoading(false);
  }, [status]);

  // A new search term or filter always starts from the first page.
  const handleSearchChange = (values: SearchValues) => {
    setSearch(values);
    setPage(1);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setPage(1);
  };

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize]);

  useDebouncedEffect(handleSearch, [search]);

  const countryOptions = useMemo(() => toSelectOptions(countries), [countries]);
  // Slider limits come from the years present in the collection.
  const yearBounds = useMemo(
    () => ({ max: startYears.length ? Math.max(...startYears) : 0, min: startYears.length ? Math.min(...startYears) : 0 }),
    [startYears]
  );

  useStatusToast({
    errorMessage: 'Não foi possível remover o filme dos favoritos.',
    onSuccess: reloadAfterAction,
    reset: () => dispatch(resetDeleteStatus()),
    status: deleteStatus,
    successMessage: 'Filme removido dos favoritos com sucesso.',
  });

  const { loading: isDeletingReview, run: deleteReview } = useAsyncAction(async (tconst: string) => {
    try {
      await favoritesService.removeReview(tconst);
      showSuccess({ title: 'Resenha excluída com sucesso!' });
      reloadAfterAction();
    } catch (error) {
      if (isApiError(error) && error.status === 404) {
        showInfo({ title: 'Nenhuma resenha encontrada para excluir.' });
        return;
      }
      showError({ title: 'Erro ao excluir resenha.' });
    }
  });

  // Both removals ask for confirmation first; the dialog knows which one.
  const handleConfirm = async () => {
    if (!pending) return;
    if (pending.kind === 'favorite') dispatch(deleteFavorite(pending.entry.tconst));
    else await deleteReview(pending.entry.tconst);
    setPending(null);
  };

  const columns = useMemo(
    () =>
      buildColumns({
        onDelete: entry => setPending({ entry, kind: 'favorite' }),
        onDeleteReview: entry => setPending({ entry, kind: 'review' }),
        onOpenReview: entry => navigate(ROUTES.review(entry.tconst)),
        onWatchedChange: reloadAfterAction,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [search, page, pageSize]
  );

  return (
    <>
      <PageHeader
        actions={<AddFavorite onAdded={handleSearch} />}
        description={total_documents ? `${total_documents} filmes na coleção` : undefined}
        title='Favoritos'
      />
      <Search countryOptions={countryOptions} onChange={handleSearchChange} values={search} yearBounds={yearBounds} />
      <ConfirmDialog
        isOpen={pending !== null}
        loading={isDeletingReview || deleteStatus === 'loading'}
        onCancel={() => setPending(null)}
        onConfirm={handleConfirm}
        title={pending?.kind === 'review' ? 'Excluir resenha' : 'Excluir favorito'}
      >
        {pending?.kind === 'review' ? 'Excluir a resenha de ' : 'Remover '}
        <strong>{pending?.entry.primaryTitle}</strong>
        {pending?.kind === 'review' ? '? O filme continua na coleção.' : ' da coleção? Essa ação não pode ser desfeita.'}
      </ConfirmDialog>
      <Table
        columns={columns}
        entries={entries}
        isActionLoading={isActionLoading}
        isLoading={isLoading}
        pagination={{
          onPageChange: setPage,
          onPageSizeChange: handlePageSizeChange,
          page,
          pageSize,
          totalDocuments: total_documents,
        }}
        rowKey={entry => entry.tconst}
      />
    </>
  );
}
