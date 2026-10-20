import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

import { useAppDispatch, useAppSelector } from '../../../../../lib/hooks';
import { TCONST_REGEX } from '../../../../const';
import { useStatusToast } from '../../../../hooks/useStatusToast';
import Button from '../../../../ui/Button';
import Dialog, { DialogField, DialogFooter } from '../../../../ui/Dialog';
import LoadingModal from '../../../../ui/LoadingModal';
import { addFavorite, resetAddStatus } from '../../reducer/favoritesSlice';
import * as S from './styles';

interface AddFavoriteProps {
  // Called after the movie is saved so the list below can be refreshed.
  onAdded: () => void;
}

// A primary button for the page header that opens the "add by tconst" dialog.
const AddFavorite = ({ onAdded }: AddFavoriteProps) => {
  const dispatch = useAppDispatch();
  const { addStatus, error } = useAppSelector(state => state.favorites);
  const [isOpen, setIsOpen] = useState(false);
  const [tconst, setTconst] = useState('');

  const isLoading = addStatus === 'loading';
  const value = tconst.trim();
  const isValid = TCONST_REGEX.test(value);

  const handleAdd = () => {
    if (!isValid || isLoading) return;
    dispatch(addFavorite(value));
  };

  const handleClose = () => {
    if (isLoading) return;
    setIsOpen(false);
    setTconst('');
  };

  useStatusToast({
    error,
    errorMessage: 'Não foi possível adicionar o filme na coleção.',
    onSuccess: () => {
      setIsOpen(false);
      setTconst('');
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
        <Dialog isOpen={isOpen} onClose={handleClose} title='Adicionar na coleção'>
          <DialogField>
            <label htmlFor='add-favorite-tconst'>ID do filme no IMDb (tconst)</label>
            <input
              disabled={isLoading}
              id='add-favorite-tconst'
              onChange={e => setTconst(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAdd()}
              placeholder='Ex: tt0084805'
              type='text'
              value={tconst}
            />
            <S.Hint>
              É o código que aparece na URL da página do filme no IMDb. A coleta dos dados leva alguns segundos.
            </S.Hint>
          </DialogField>
          <DialogFooter>
            <Button disabled={isLoading} onClick={handleClose} variant='outline'>
              Cancelar
            </Button>
            <Button disabled={!isValid} loading={isLoading} onClick={handleAdd}>
              Adicionar
            </Button>
          </DialogFooter>
        </Dialog>
      )}

      <LoadingModal isOpen={isLoading} message='Adicionando filme na coleção...' />
    </>
  );
};

export default AddFavorite;
