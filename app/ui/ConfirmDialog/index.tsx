import { ReactNode } from 'react';

import Button from '../Button';
import Dialog, { DialogFooter } from '../Dialog';
import * as S from './styles';

interface ConfirmDialogProps {
  children: ReactNode;
  confirmLabel?: string;
  isOpen: boolean;
  loading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  title: string;
}

// Yes/no question before an action that cannot be undone, such as a delete.
const ConfirmDialog = ({
  children,
  confirmLabel = 'Excluir',
  isOpen,
  loading = false,
  onCancel,
  onConfirm,
  title,
}: ConfirmDialogProps) => (
  <Dialog isOpen={isOpen} onClose={onCancel} title={title}>
    <S.Message>{children}</S.Message>
    <DialogFooter>
      <Button disabled={loading} onClick={onCancel} variant='outline'>
        Cancelar
      </Button>
      <Button loading={loading} onClick={onConfirm} variant='danger'>
        {confirmLabel}
      </Button>
    </DialogFooter>
  </Dialog>
);

export default ConfirmDialog;
