import Image from 'next/image';

import Dialog from '../../../../ui/Dialog';

interface StickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSticker: { url: string; filename: string } | null;
}

export default function StickerModal({ isOpen, onClose, selectedSticker }: StickerModalProps) {
  return (
    <Dialog isOpen={isOpen} onClose={onClose} title='Visualizar Sticker'>
      {selectedSticker && (
        <Image
          src={selectedSticker.url}
          alt={selectedSticker.filename}
          width={600}
          height={600}
          style={{ borderRadius: 8, maxHeight: '70vh', maxWidth: '100%', objectFit: 'contain' }}
        />
      )}
    </Dialog>
  );
}
