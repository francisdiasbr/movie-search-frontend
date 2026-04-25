import { FaTrash } from 'react-icons/fa';

import * as S from './styles';

interface StickerSectionProps {
  onRemoveSticker: (filename: string) => void;
  onStickerClick: (sticker: { url: string; filename: string }) => void;
  stickers: Array<{ url: string; filename: string }> | null;
}

export default function StickerSection({ onRemoveSticker, onStickerClick, stickers }: StickerSectionProps) {
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
                <img
                  src={sticker.url}
                  alt={`Sticker ${index + 1}`}
                  style={{ cursor: 'pointer', height: '100%', inset: 0, objectFit: 'contain', position: 'absolute', width: '100%' }}
                  onClick={() => onStickerClick(sticker)}
                />
                <S.StickerOverlay>
                  <button onClick={() => onRemoveSticker(sticker.filename)} title='Remover sticker'>
                    <FaTrash />
                  </button>
                </S.StickerOverlay>
              </S.StickerContainer>
            ))}
          </S.StickersGrid>
        ) : (
          <S.EmptyState>
            <S.EmptyText>Nenhum sticker gerado.</S.EmptyText>
          </S.EmptyState>
        )}
      </S.CardBody>
    </S.Card>
  );
}
