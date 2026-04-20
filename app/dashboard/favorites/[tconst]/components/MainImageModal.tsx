import Image from 'next/image';

import Dialog from '../../../../ui/Dialog';

interface MainImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedMainImage: { url: string; filename: string } | null;
}

export default function MainImageModal({ isOpen, onClose, selectedMainImage }: MainImageModalProps) {
  return (
    <Dialog isOpen={isOpen} onClose={onClose} title='Visualizar Imagem Principal'>
      {selectedMainImage && (
        <Image
          src={selectedMainImage.url}
          alt={selectedMainImage.filename}
          width={800}
          height={600}
          style={{ borderRadius: 8, maxHeight: '70vh', maxWidth: '100%', objectFit: 'contain' }}
        />
      )}
    </Dialog>
  );
}
