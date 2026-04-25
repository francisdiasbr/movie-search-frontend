

import { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'sonner';

import { editDetails, fetchDetails } from '../../../../../lib/features/movie/movieDetailsSlice';
import { useAppDispatch } from '../../../../../lib/hooks';
import Dialog from '../../../../ui/Dialog';

interface EditModalProps {
  data: any;
  isOpen: boolean;
  onClose: () => void;
  tconst: string;
}

interface ReferenceInputProps {
  onChange: (value: string) => void;
  onRemove: () => void;
  value: string;
}

const ReferenceInput = ({ onChange, onRemove, value }: ReferenceInputProps) => (
  <div className='dialog-ref-row'>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder='Digite a URL da referência'
    />
    <button type='button' onClick={onRemove} title='Remover referência'>
      <FaTrash />
    </button>
  </div>
);

export default function EditModal({ data, isOpen, onClose, tconst }: EditModalProps) {
  const [formData, setFormData] = useState(data);
  const dispatch = useAppDispatch();

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
        toast.success('Filme atualizado com sucesso.');
        onClose();
        dispatch(fetchDetails(tconst));
      } else {
        toast.error('Não foi possível atualizar o filme.');
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
      <div className='dialog-field'>
        <label>Trilha Sonora (Spotify URL)</label>
        <input
          value={formData?.soundtrack || ''}
          onChange={(e) => setFormData({ ...formData, soundtrack: e.target.value })}
          placeholder='URL da trilha sonora no Spotify'
        />
      </div>

      <div className='dialog-field'>
        <label>Wiki</label>
        <input
          value={formData?.wiki || ''}
          onChange={(e) => setFormData({ ...formData, wiki: e.target.value })}
          placeholder='URL da página Wiki'
        />
      </div>

      <div className='dialog-field'>
        <label>Magnet Link (Torrent)</label>
        <input
          value={formData?.magnet_link || ''}
          onChange={(e) => setFormData({ ...formData, magnet_link: e.target.value })}
          placeholder='magnet:?xt=urn:btih:...'
        />
      </div>

      <div className='dialog-field'>
        <label>Referências</label>
        {(formData?.references || []).map((reference: string, index: number) => (
          <ReferenceInput
            key={index}
            value={reference}
            onChange={(value) => handleReferenceChange(index, value)}
            onRemove={() => handleReferenceRemove(index)}
          />
        ))}
        <button type='button' onClick={handleAddReference}>
          Adicionar Referência
        </button>
      </div>

      <div className='dialog-footer'>
        <button type='button' onClick={onClose}>Cancelar</button>
        <button type='button' onClick={handleUpdate}>Salvar</button>
      </div>
    </Dialog>
  );
}
