import { DeleteIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';
import Image from 'next/image';

import * as S from './styles';

interface StickerSectionProps {
  onRemoveSticker: (filename: string) => void;
  onStickerClick: (sticker: { url: string; filename: string }) => void;
  stickers: Array<{ url: string; filename: string }> | null;
}

export default function StickerSection({
  onRemoveSticker,
  onStickerClick,
  stickers,
}: StickerSectionProps) {
  return (
    <S.Card>
      <S.CardHeader>
        <S.CardTitle>Stickers</S.CardTitle>
      </S.CardHeader>
      <S.CardBody>
        {stickers && stickers.length > 0 ? (
          <S.StickersGrid>
            {stickers.map((sticker, index) => (
                <S.StickerContainer key={sticker.filename || index}>
                  <Image
                    src={sticker.url}
                    alt={`Sticker ${index + 1}`}
                    fill
                    style={{
                      objectFit: 'contain',
                      cursor: 'pointer'
                    }}
                    onClick={() => onStickerClick(sticker)}
                  />
                  <S.StickerOverlay>
                <IconButton
                  aria-label="Remover sticker"
                  icon={<DeleteIcon />}
                  size="sm"
                  colorScheme="red"
                  onClick={() => onRemoveSticker(sticker.filename)}
                />
                  </S.StickerOverlay>
                </S.StickerContainer>
              ))}
          </S.StickersGrid>
        ) : (
          <S.EmptyState>
            <S.EmptyText>
              Nenhum sticker gerado.
            </S.EmptyText>
          </S.EmptyState>
        )}
      </S.CardBody>
    </S.Card>
  );
}
