

import { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';

import { editDetails } from '../../reducer/movieDetailsSlice';
import { MovieDetailsItem } from '../../types';
import { useAppDispatch } from '../../../../../lib/hooks';
import { useToastNotifications } from '../../../../hooks/useToastNotifications';
import Button from '../../../../ui/Button';
import Dialog, { DialogField, DialogFooter, DialogRow } from '../../../../ui/Dialog';
import IconButton from '../../../../ui/IconButton';

interface EditInfoModalProps {
  data: MovieDetailsItem;
  isOpen: boolean;
  onClose: () => void;
}

interface ReferenceInputProps {
  onChange: (value: string) => void;
  onRemove: () => void;
  value: string;
}

const ReferenceInput = ({ onChange, onRemove, value }: ReferenceInputProps) => (
  <DialogRow>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder='Digite a URL da referência'
    />
    <IconButton icon={FaTrash} onClick={onRemove} title='Remover referência' />
  </DialogRow>
);

export default function EditInfoModal({ data, isOpen, onClose }: EditInfoModalProps) {
  const [formData, setFormData] = useState(data);
  const dispatch = useAppDispatch();
  const { showSuccess, showError } = useToastNotifications();

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleUpdate = async () => {
    if (!formData) return;

    const updateData = {
      magnet_link: formData.magnet_link || '',
      references: Array.isArray(formData.references)
        ? formData.references.filter((ref: string) => ref.trim() !== '')
        : [],
      soundtrack: formData.soundtrack || '',
      tconst: data.tconst,
      watched: data.watched,
      wiki: formData.wiki || '',
    };

    dispatch(editDetails(updateData)).then((resultAction) => {
      if (editDetails.fulfilled.match(resultAction)) {
        showSuccess({ title: 'Filme atualizado com sucesso.' });
        onClose();
      } else {
        showError({ title: 'Não foi possível atualizar o filme.' });
      }
    });
  };

  const handleAddReference = () => {
    setFormData({ ...formData, references: [...(formData.references || []), ''] });
  };

  const handleReferenceChange = (index: number, value: string) => {
    const refs = [...(formData.references || [])];
    refs[index] = value;
    setFormData({ ...formData, references: refs });
  };

  const handleReferenceRemove = (index: number) => {
    const refs = [...(formData.references || [])];
    refs.splice(index, 1);
    setFormData({ ...formData, references: refs });
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title='Editar Favorito'>
      <DialogField>
        <label>Trilha Sonora (Spotify URL)</label>
        <input
          value={formData?.soundtrack || ''}
          onChange={(e) => setFormData({ ...formData, soundtrack: e.target.value })}
          placeholder='URL da trilha sonora no Spotify'
        />
      </DialogField>

      <DialogField>
        <label>Wiki</label>
        <input
          value={formData?.wiki || ''}
          onChange={(e) => setFormData({ ...formData, wiki: e.target.value })}
          placeholder='URL da página Wiki'
        />
      </DialogField>

      <DialogField>
        <label>Magnet Link (Torrent)</label>
        <input
          value={formData?.magnet_link || ''}
          onChange={(e) => setFormData({ ...formData, magnet_link: e.target.value })}
          placeholder='magnet:?xt=urn:btih:...'
        />
      </DialogField>

      <DialogField>
        <label>Referências</label>
        {(formData?.references || []).map((reference: string, index: number) => (
          <ReferenceInput
            key={index}
            value={reference}
            onChange={(value) => handleReferenceChange(index, value)}
            onRemove={() => handleReferenceRemove(index)}
          />
        ))}
        <Button variant='outline' size='small' onClick={handleAddReference}>
          Adicionar Referência
        </Button>
      </DialogField>

      <DialogFooter>
        <Button variant='outline' onClick={onClose}>Cancelar</Button>
        <Button onClick={handleUpdate}>Salvar</Button>
      </DialogFooter>
    </Dialog>
  );
}
