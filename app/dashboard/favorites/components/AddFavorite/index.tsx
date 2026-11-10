import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

import { useAppDispatch, useAppSelector } from '../../../../../lib/hooks';
import { useStatusToast } from '../../../../hooks/useStatusToast';
import Button from '../../../../ui/Button';
import LoadingModal from '../../../../ui/LoadingModal';
import AddTitleDialog from '../../../components/AddTitleDialog';
import { addFavorite, resetAddStatus } from '../../reducer/favoritesSlice';

interface AddFavoriteProps {
  // Called after the movie is saved so the list below can be refreshed.
  onAdded: () => void;
}

// A primary button for the page header that opens the "add by tconst" dialog.
const AddFavorite = ({ onAdded }: AddFavoriteProps) => {
  const dispatch = useAppDispatch();
  const { addStatus, error } = useAppSelector(state => state.favorites);
  const [isOpen, setIsOpen] = useState(false);

  const isLoading = addStatus === 'loading';

  useStatusToast({
    error,
    errorMessage: 'Não foi possível adicionar o filme na coleção.',
    onSuccess: () => {
      setIsOpen(false);
      onAdded();
    },
    reset: () => dispatch(resetAddStatus()),
    status: addStatus,
    successMessage: 'Filme adicionado na coleção.',
  });

  return (
    <>
      <Button iconLeft={FaPlus} onClick={() => setIsOpen(true)}>
        Adicionar na coleção
      </Button>

      {isOpen && (
        <AddTitleDialog
          hint='É o código que aparece na URL da página do filme no IMDb. A coleta dos dados leva alguns segundos.'
          isOpen={isOpen}
          loading={isLoading}
          onClose={() => setIsOpen(false)}
          onSubmit={tconst => dispatch(addFavorite(tconst))}
          title='Adicionar na coleção'
        />
      )}

      <LoadingModal isOpen={isLoading} message='Adicionando filme na coleção...' />
    </>
  );
};

export default AddFavorite;
