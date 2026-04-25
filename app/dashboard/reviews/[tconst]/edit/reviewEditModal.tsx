

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import Dialog from '../../../../ui/Dialog';

interface ReviewContent {
  pt?: { text: string };
  en?: { text: string };
}

interface ReviewEditModalProps {
  initialContent: ReviewContent;
  onCancel: () => void;
  onSave: (content: ReviewContent) => Promise<void>;
}

export default function ReviewEditModal({ initialContent, onCancel, onSave }: ReviewEditModalProps) {
  const [content, setContent] = useState<ReviewContent>({
    pt: { text: initialContent.pt?.text || '' },
    en: { text: initialContent.en?.text || '' },
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave({
      pt: { text: content.pt?.text || '' },
      en: { text: content.en?.text || '' },
    });
    navigate(-1);
  };

  return (
    <Dialog isOpen={true} onClose={onCancel} title='Editar Resenha'>
      <form onSubmit={handleSubmit}>
        <div className='dialog-field'>
          <label>Português:</label>
          <textarea
            value={content.pt?.text || ''}
            onChange={(e) => setContent({ ...content, pt: { text: e.target.value } })}
            rows={6}
          />
        </div>

        <div className='dialog-field'>
          <label>English:</label>
          <textarea
            value={content.en?.text || ''}
            onChange={(e) => setContent({ ...content, en: { text: e.target.value } })}
            rows={6}
          />
        </div>

        <div className='dialog-footer'>
          <button type='button' onClick={onCancel}>Cancelar</button>
          <button type='submit'>Salvar</button>
        </div>
      </form>
    </Dialog>
  );
}
