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
import Search, { SearchValues } from './components/Search';
import { fetchFavorites } from './reducer/favoritesSlice';
import { deleteFavorite, resetDeleteStatus } from './reducer/movieDetailsSlice';
import favoritesService from './service/FavoritesService';

const INITIAL_SEARCH: SearchValues = { searchTerm: '' };

export default function Page() {
  const dispatch = useAppDispatch();
  const { countries, entries, total_documents, status, startYears } = useAppSelector(state => state.favorites);
  const { deleteStatus } = useAppSelector(state => state.favoriteDetails);
  const { showSuccess, showError, showInfo } = useToastNotifications();
  const [search, setSearch] = useState<SearchValues>(INITIAL_SEARCH);

  const isLoading = status === 'loading';

  const handleSearch = () => {
    const { searchTerm, ...filters } = search;
    dispatch(fetchFavorites({ filters, searchTerm }));
  };

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useDebouncedEffect(handleSearch, [search]);

  const countryOptions = useMemo(() => toSelectOptions(countries), [countries]);
  const yearOptions = useMemo(() => toSelectOptions(startYears), [startYears]);

  useStatusToast({
    errorMessage: 'Não foi possível remover o filme dos favoritos.',
    onSuccess: handleSearch,
    reset: () => dispatch(resetDeleteStatus()),
    status: deleteStatus,
    successMessage: 'Filme removido dos favoritos com sucesso.',
  });

  const handleDeleteReview = async (tconst: string) => {
    try {
      await favoritesService.removeReview(tconst);
      showSuccess({ title: 'Resenha deletada com sucesso!' });
      handleSearch();
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
        onWatchedChange: handleSearch,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [search]
  );

  return (
    <>
      <PageHeader title='Favoritos' />
      <Search countryOptions={countryOptions} onChange={setSearch} values={search} yearOptions={yearOptions} />
      <Table
        columns={columns}
        entries={entries}
        isLoading={isLoading}
        rowKey={entry => entry.tconst}
        totalDocuments={total_documents}
      />
    </>
  );
}
