import { useRef } from 'react';
import { FaImage, FaTrash } from 'react-icons/fa';

import * as S from './styles';

interface MainImageUploadProps {
  images: Array<{ url: string; filename: string; sequential_id?: number }> | null;
  onDeleteMain: (filename: string) => Promise<void>;
  onGenerateSticker: (sequentialId?: number) => void;
  onMainImageClick: (image: { url: string; filename: string }) => void;
  onUploadMainImage: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  stickerStatus: string;
  tconst: string;
  uploadMainStatus: string;
}

export default function MainImageUpload({
  images,
  onDeleteMain,
  onGenerateSticker,
  onMainImageClick,
  onUploadMainImage,
  stickerStatus,
  uploadMainStatus,
}: MainImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <S.Card>
      <S.CardHeader>
        <S.CardTitle>Imagens</S.CardTitle>
        <button onClick={() => fileInputRef.current?.click()} disabled={uploadMainStatus === 'loading'}>
          {uploadMainStatus === 'loading'
            ? 'Enviando...'
            : images && images.length > 0
            ? 'Adicionar mais'
            : 'Adicionar imagem'}
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
                  <button
                    onClick={() => onGenerateSticker(img.sequential_id)}
                    disabled={stickerStatus === 'loading'}
                    title='Gerar sticker desta imagem'
                  >
                    <FaImage />
                  </button>
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
        <input
          type='file'
          ref={fileInputRef}
          onChange={onUploadMainImage}
          accept='image/*'
          style={{ display: 'none' }}
        />
      </S.CardBody>
    </S.Card>
  );
}
