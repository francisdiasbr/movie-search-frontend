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
        <img
          src={selectedMainImage.url}
          alt={selectedMainImage.filename}
          style={{ borderRadius: 8, maxHeight: '70vh', maxWidth: '100%', objectFit: 'contain' }}
        />
      )}
    </Dialog>
  );
}
