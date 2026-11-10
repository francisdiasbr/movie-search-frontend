import { useState } from 'react';

import { TCONST_REGEX } from '../../../const';
import Button from '../../../ui/Button';
import Dialog, { DialogField, DialogFooter } from '../../../ui/Dialog';
import * as S from './styles';

interface AddTitleDialogProps {
  hint: string;
  isOpen: boolean;
  loading: boolean;
  onClose: () => void;
  // Receives a valid tconst; the caller decides what to do with it.
  onSubmit: (tconst: string) => void;
  title: string;
}

// "Type an IMDb id" dialog shared by the lists that add titles by tconst.
// Mount it only while open so the field starts empty every time.
const AddTitleDialog = ({ hint, isOpen, loading, onClose, onSubmit, title }: AddTitleDialogProps) => {
  const [tconst, setTconst] = useState('');

  const value = tconst.trim();
  const isValid = TCONST_REGEX.test(value);

  const handleSubmit = () => {
    if (isValid && !loading) onSubmit(value);
  };

  const handleClose = () => {
    if (!loading) onClose();
  };

  return (
    <Dialog isOpen={isOpen} onClose={handleClose} title={title}>
      <DialogField>
        <label htmlFor='add-title-tconst'>ID do título no IMDb (tconst)</label>
        <input
          disabled={loading}
          id='add-title-tconst'
          onChange={e => setTconst(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          placeholder='Ex: tt0084805'
          type='text'
          value={tconst}
        />
        <S.Hint>{hint}</S.Hint>
      </DialogField>
      <DialogFooter>
        <Button disabled={loading} onClick={handleClose} variant='outline'>
          Cancelar
        </Button>
        <Button disabled={!isValid} loading={loading} onClick={handleSubmit}>
          Adicionar
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default AddTitleDialog;
