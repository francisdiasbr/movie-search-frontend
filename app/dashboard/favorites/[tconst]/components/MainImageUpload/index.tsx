import { DeleteIcon } from '@chakra-ui/icons';
import { Input, IconButton, Button } from '@chakra-ui/react';
import Image from 'next/image';
import { useRef } from 'react';
import { FaImage } from 'react-icons/fa';

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
  tconst,
  uploadMainStatus,
}: MainImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <S.Card>
      <S.CardHeader>
        <S.CardTitle>Imagens</S.CardTitle>
        <Button
          size="sm"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploadMainStatus === 'loading'}
        >
          {uploadMainStatus === 'loading' 
            ? 'Enviando...' 
            : images && images.length > 0 
              ? 'Adicionar mais' 
              : 'Adicionar imagem'
          }
        </Button>
      </S.CardHeader>
      <S.CardBody>
        {Array.isArray(images) && images.length > 0 ? (
          <S.ImagesGrid>
            {images.map((img, index) => (
              <S.ImageContainer key={img.filename || index}>
                <Image
                  src={img.url}
                  alt={img.filename || `Imagem ${index + 1}`}
                  fill
                  style={{
                    objectFit: 'cover',
                    cursor: 'pointer'
                  }}
                  onClick={() => onMainImageClick(img)}
                />
                <S.ImageOverlay>
                  <IconButton
                    aria-label="Gerar sticker desta imagem"
                    icon={<FaImage />}
                    size="sm"
                    colorScheme="purple"
                    onClick={() => onGenerateSticker(img.sequential_id)}
                    isLoading={stickerStatus === 'loading'}
                  />
                  <IconButton
                    aria-label="Deletar imagem principal"
                    icon={<DeleteIcon />}
                    size="sm"
                    colorScheme="red"
                    onClick={() => onDeleteMain(img.filename)}
                  />
                </S.ImageOverlay>
              </S.ImageContainer>
            ))}
          </S.ImagesGrid>
        ) : (
          <S.EmptyState>
            <S.EmptyText>
              Nenhuma imagem adicionada.
            </S.EmptyText>
          </S.EmptyState>
        )}
        <Input
          type="file"
          ref={fileInputRef}
          onChange={onUploadMainImage}
          accept="image/*"
          style={{ display: 'none' }}
        />
      </S.CardBody>
    </S.Card>
  );
}
