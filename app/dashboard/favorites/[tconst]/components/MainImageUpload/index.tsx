import { FaTrash } from 'react-icons/fa';

import { AsyncStatus } from '../../../../../../lib/api/types';
import { ImageItem } from '../../../../../../lib/service/ImagesBaseService';
import { useFilePicker } from '../../../../../hooks/useFilePicker';
import Button from '../../../../../ui/Button';
import Card from '../../../../../ui/Card';
import IconButton from '../../../../../ui/IconButton';
import * as S from '../../styles';

interface MainImageUploadProps {
  images: ImageItem[];
  onDeleteMain: (filename: string) => Promise<void>;
  onMainImageClick: (image: ImageItem) => void;
  onUploadMainImage: (file: File) => Promise<void>;
  updateImageStatus: AsyncStatus;
}

export default function MainImageUpload({
  images,
  onDeleteMain,
  onMainImageClick,
  onUploadMainImage,
  updateImageStatus,
}: MainImageUploadProps) {
  const filePicker = useFilePicker(onUploadMainImage);
  const hasImages = images.length > 0;

  return (
    <Card
      title='Imagens'
      actions={
        <Button variant='secondary' size='small' onClick={filePicker.open} loading={updateImageStatus === 'loading'}>
          {hasImages ? 'Adicionar mais' : 'Adicionar imagem'}
        </Button>
      }
    >
      {filePicker.input}
      {hasImages ? (
        <S.ImagesGrid>
          {images.map((img, index) => (
            <S.ImageContainer key={img.filename || index}>
              <S.MainImage src={img.url} alt={img.filename || `Imagem ${index + 1}`} onClick={() => onMainImageClick(img)} />
              <S.ImageOverlay>
                <IconButton icon={FaTrash} onClick={() => onDeleteMain(img.filename)} title='Deletar imagem principal' />
              </S.ImageOverlay>
            </S.ImageContainer>
          ))}
        </S.ImagesGrid>
      ) : (
        <S.EmptyText>Nenhuma imagem adicionada.</S.EmptyText>
      )}
    </Card>
  );
}
