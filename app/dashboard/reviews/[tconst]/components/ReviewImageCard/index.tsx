import { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

import { ImageItem } from '../../../../../../lib/service/ImagesBaseService';
import { useAsyncAction } from '../../../../../hooks/useAsyncAction';
import Button from '../../../../../ui/Button';
import IconButton from '../../../../../ui/IconButton';
import * as S from './styles';

interface ReviewImageCardProps {
  image: ImageItem;
  onDelete: (filename: string) => Promise<unknown>;
  onSaveCaption: (filename: string, caption: string) => Promise<unknown>;
  position: number;
}

// One gallery image with its caption and the inline form to change it.
const ReviewImageCard = ({ image, onDelete, onSaveCaption, position }: ReviewImageCardProps) => {
  const [editing, setEditing] = useState(false);
  const [caption, setCaption] = useState(image.subtitle_pt ?? '');

  const { loading: saving, run: save } = useAsyncAction(async () => {
    await onSaveCaption(image.filename, caption);
    setEditing(false);
  });

  const startEditing = () => {
    setCaption(image.subtitle_pt ?? '');
    setEditing(true);
  };

  return (
    <S.Figure>
      <S.Image src={image.url} alt={image.subtitle_pt || `Imagem ${position} do filme`} />
      {image.subtitle_pt && <S.Caption>{image.subtitle_pt}</S.Caption>}
      <S.Actions>
        <IconButton icon={FaEdit} onClick={startEditing} title='Editar legenda' />
        <IconButton icon={FaTrash} onClick={() => onDelete(image.filename)} title='Deletar imagem' />
      </S.Actions>
      {editing && (
        <S.CaptionForm>
          <input
            placeholder='Escreva a legenda para a imagem'
            value={caption}
            onChange={e => setCaption(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && save()}
          />
          <Button size='small' onClick={() => save()} loading={saving}>
            Salvar
          </Button>
          <Button size='small' variant='outline' onClick={() => setEditing(false)} disabled={saving}>
            Cancelar
          </Button>
        </S.CaptionForm>
      )}
    </S.Figure>
  );
};

export default ReviewImageCard;
