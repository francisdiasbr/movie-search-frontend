import { useEffect, useMemo, useState } from 'react';

import { isApiError } from '../../../lib/api/errors';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import { useDebouncedEffect } from '../../hooks/useDebouncedEffect';
import { useStatusToast } from '../../hooks/useStatusToast';
import { useToastNotifications } from '../../hooks/useToastNotifications';
import PageHeader from '../../ui/PageHeader';
import Table from '../../ui/Table';
import { toSelectOptions } from '../../util/select';
import { buildColumns } from './columns';
import AddFavorite from './components/AddFavorite';
import Search, { SearchValues } from './components/Search';
import { fetchFavorites } from './reducer/favoritesSlice';
import { deleteFavorite, resetDeleteStatus } from './reducer/movieDetailsSlice';
import favoritesService from './service/FavoritesService';

const INITIAL_SEARCH: SearchValues = { searchTerm: '' };
const INITIAL_PAGE_SIZE = 10;

export default function Page() {
  const dispatch = useAppDispatch();
  const { countries, entries, total_documents, status, startYears } = useAppSelector(state => state.favorites);
  const { deleteStatus } = useAppSelector(state => state.favoriteDetails);
  const { showSuccess, showError, showInfo } = useToastNotifications();
  const [search, setSearch] = useState<SearchValues>(INITIAL_SEARCH);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(INITIAL_PAGE_SIZE);

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

  const handleDeleteReview = async (tconst: string) => {
    try {
      await favoritesService.removeReview(tconst);
      showSuccess({ title: 'Resenha deletada com sucesso!' });
      reloadAfterAction();
    } catch (error) {
      if (isApiError(error) && error.status === 404) {
        showInfo({ title: 'Nenhuma resenha encontrada para deletar.' });
        return;
      }
      showError({ title: 'Erro ao deletar resenha.' });
    }
  };

  const columns = useMemo(
    () =>
      buildColumns({
        onDelete: tconst => dispatch(deleteFavorite(tconst)),
        onDeleteReview: handleDeleteReview,
        onWatchedChange: reloadAfterAction,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [search, page, pageSize]
  );

  return (
    <>
      <PageHeader title='Favoritos' />
      <AddFavorite onAdded={handleSearch} />
      <Search countryOptions={countryOptions} onChange={handleSearchChange} values={search} yearBounds={yearBounds} />
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
