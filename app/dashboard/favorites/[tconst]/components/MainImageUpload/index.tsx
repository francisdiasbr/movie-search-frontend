import { FaTrash } from 'react-icons/fa';

import { AsyncStatus } from '../../../../../../lib/api/types';
import { useFilePicker } from '../../../../../hooks/useFilePicker';
import * as S from '../../styles';

interface MainImageUploadProps {
  images: Array<{ url: string; filename: string; sequential_id?: number }> | null;
  onDeleteMain: (filename: string) => Promise<void>;
  onMainImageClick: (image: { url: string; filename: string }) => void;
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

  return (
    <S.Card>
      <S.CardHeader>
        <S.CardTitle>Imagens</S.CardTitle>
        <button onClick={filePicker.open} disabled={updateImageStatus === 'loading'}>
          {updateImageStatus === 'loading' ? 'Adicionando' : images && images.length > 0 ? 'Adicionar mais' : 'Adicionar imagem'}
        </button>
      </S.CardHeader>
      <S.CardBody>
        {Array.isArray(images) && images.length > 0 ? (
          <S.ImagesGrid>
            {images.map((img, index) => (
              <S.ImageContainer key={img.filename || index}>
                <img
                  src={img.url}
                  alt={img.filename || `Imagem ${index + 1}`}
                  style={{ cursor: 'pointer', height: '100%', inset: 0, objectFit: 'cover', position: 'absolute', width: '100%' }}
                  onClick={() => onMainImageClick(img)}
                />
                <S.ImageOverlay>
                  <button onClick={() => onDeleteMain(img.filename)} title='Deletar imagem principal'>
                    <FaTrash />
                  </button>
                </S.ImageOverlay>
              </S.ImageContainer>
            ))}
          </S.ImagesGrid>
        ) : (
          <S.EmptyState>
            <S.EmptyText>Nenhuma imagem adicionada.</S.EmptyText>
          </S.EmptyState>
        )}
        {filePicker.input}
      </S.CardBody>
    </S.Card>
  );
}
