import { ImageItem } from '../../../../../lib/service/ImagesBaseService';
import Dialog from '../../../../ui/Dialog';
import * as S from '../styles';

interface MainImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedMainImage: ImageItem | null;
}

export default function MainImageModal({ isOpen, onClose, selectedMainImage }: MainImageModalProps) {
  return (
    <Dialog isOpen={isOpen} onClose={onClose} title='Visualizar Imagem Principal'>
      {selectedMainImage && (
        <S.PreviewImage src={selectedMainImage.url} alt={selectedMainImage.filename} />
      )}
    </Dialog>
  );
}
