import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';

import { useAppDispatch } from '../../../../../lib/hooks';
import { useAsyncAction } from '../../../../hooks/useAsyncAction';
import { useToastNotifications } from '../../../../hooks/useToastNotifications';
import Button from '../../../../ui/Button';
import Dialog, { DialogField, DialogFooter, DialogRow } from '../../../../ui/Dialog';
import IconButton from '../../../../ui/IconButton';
import { editDetails } from '../../reducer/movieDetailsSlice';
import { MovieDetailsItem } from '../../types';

interface EditInfoModalProps {
  data: MovieDetailsItem;
  isOpen: boolean;
  onClose: () => void;
}

interface FormValues {
  magnet_link: string;
  references: string[];
  soundtrack: string;
  wiki: string;
}

const FIELDS: Array<{ key: 'magnet_link' | 'soundtrack' | 'wiki'; label: string; placeholder: string }> = [
  { key: 'soundtrack', label: 'Trilha Sonora (Spotify URL)', placeholder: 'URL da trilha sonora no Spotify' },
  { key: 'wiki', label: 'Wiki', placeholder: 'URL da página Wiki' },
  { key: 'magnet_link', label: 'Magnet Link (Torrent)', placeholder: 'magnet:?xt=urn:btih:...' },
];

export default function EditInfoModal({ data, isOpen, onClose }: EditInfoModalProps) {
  const dispatch = useAppDispatch();
  const { showSuccess, showError } = useToastNotifications();
  // Only the editable fields; the modal is mounted fresh each time it opens.
  const [values, setValues] = useState<FormValues>({
    magnet_link: data.magnet_link ?? '',
    references: data.references ?? [],
    soundtrack: data.soundtrack ?? '',
    wiki: data.wiki ?? '',
  });

  const update = (patch: Partial<FormValues>) => setValues(prev => ({ ...prev, ...patch }));

  const updateReference = (index: number, value: string | null) =>
    update({
      references: value === null
        ? values.references.filter((_, i) => i !== index)
        : values.references.map((ref, i) => (i === index ? value : ref)),
    });

  const { loading: saving, run: handleUpdate } = useAsyncAction(async () => {
    const result = await dispatch(
      editDetails({
        ...values,
        references: values.references.filter(ref => ref.trim() !== ''),
        tconst: data.tconst,
      })
    );
    if (editDetails.fulfilled.match(result)) {
      showSuccess({ title: 'Filme atualizado com sucesso.' });
      onClose();
    } else {
      showError({ title: 'Não foi possível atualizar o filme.' });
    }
  });

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title='Editar Favorito'>
      {FIELDS.map(({ key, label, placeholder }) => (
        <DialogField key={key}>
          <label htmlFor={key}>{label}</label>
          <input id={key} value={values[key]} onChange={e => update({ [key]: e.target.value })} placeholder={placeholder} />
        </DialogField>
      ))}

      <DialogField>
        <span>Referências</span>
        {values.references.map((reference, index) => (
          <DialogRow key={index}>
            <input
              aria-label={`Referência ${index + 1}`}
              value={reference}
              onChange={e => updateReference(index, e.target.value)}
              placeholder='Digite a URL da referência'
            />
            <IconButton icon={FaTrash} onClick={() => updateReference(index, null)} title='Remover referência' />
          </DialogRow>
        ))}
        <Button variant='outline' size='small' onClick={() => update({ references: [...values.references, ''] })}>
          Adicionar Referência
        </Button>
      </DialogField>

      <DialogFooter>
        <Button variant='outline' onClick={onClose} disabled={saving}>Cancelar</Button>
        <Button onClick={() => handleUpdate()} loading={saving}>Salvar</Button>
      </DialogFooter>
    </Dialog>
  );
}
