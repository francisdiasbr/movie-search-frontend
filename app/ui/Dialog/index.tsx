'use client';

import { useEffect, useRef } from 'react';

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
      <div className='dialog-header'>
        <h3>{title}</h3>
        <button className='dialog-close' onClick={onClose} type='button'>✕</button>
      </div>
      <div className='dialog-body'>{children}</div>
    </dialog>
  );
}
