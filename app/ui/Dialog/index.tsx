import { useEffect, useRef } from 'react';

import * as S from './styles';

interface DialogProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export default function Dialog({ children, isOpen, onClose, title }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === ref.current) onClose();
  };

  return (
    <dialog ref={ref} onClose={onClose} onClick={handleBackdropClick}>
      <S.Header>
        <h3>{title}</h3>
        <S.CloseButton onClick={onClose} type='button'>✕</S.CloseButton>
      </S.Header>
      <S.Body>{children}</S.Body>
    </dialog>
  );
}

// Building blocks for dialog bodies, so forms inside dialogs share one look.
export const DialogField = S.Field;
export const DialogFooter = S.Footer;
export const DialogRow = S.Row;
