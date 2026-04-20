'use client';

import { useState } from 'react';

import { BlogPostEntry } from '../../../../../lib/features/blogPosts/blogPostsSlice';
import Dialog from '../../../../ui/Dialog';

interface BlogPostEditModalProps {
  initialData: BlogPostEntry;
  onCancel: () => void;
  onSave: (data: BlogPostEntry) => Promise<void>;
}

const fields: { key: string; label: { pt: string; en: string }; rows: number }[] = [
  { key: 'title', label: { pt: 'Título', en: 'Title' }, rows: 2 },
  { key: 'introduction', label: { pt: 'Introdução', en: 'Introduction' }, rows: 4 },
  { key: 'plot_summary', label: { pt: 'Resumo do Filme', en: 'Plot Summary' }, rows: 4 },
  { key: 'acting_analysis', label: { pt: 'Análise de Atuação', en: 'Acting Analysis' }, rows: 4 },
  { key: 'personal_impressions', label: { pt: 'Impressões Pessoais', en: 'Personal Impressions' }, rows: 4 },
  { key: 'recommendation', label: { pt: 'Recomendação', en: 'Recommendation' }, rows: 4 },
  { key: 'technical_analysis', label: { pt: 'Análise Técnica', en: 'Technical Analysis' }, rows: 4 },
];

export default function BlogPostEditModal({ initialData, onCancel, onSave }: BlogPostEditModalProps) {
  const [data, setData] = useState<BlogPostEntry>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'pt' | 'en'>('pt');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSave(data);
    } finally {
      setIsLoading(false);
    }
  };

  const updateContent = (lang: 'pt' | 'en', field: string, value: string) => {
    setData({
      ...data,
      content: {
        ...data.content,
        [lang]: { ...data.content[lang], [field]: value },
      },
    });
  };

  return (
    <Dialog isOpen={true} onClose={onCancel} title='Editar Resenha Gerada com IA'>
      <form onSubmit={handleSubmit}>
        <div className='dialog-tabs'>
          <button
            type='button'
            className={`dialog-tab${activeTab === 'pt' ? ' active' : ''}`}
            onClick={() => setActiveTab('pt')}
          >
            Português
          </button>
          <button
            type='button'
            className={`dialog-tab${activeTab === 'en' ? ' active' : ''}`}
            onClick={() => setActiveTab('en')}
          >
            English
          </button>
        </div>

        {fields.map(({ key, label, rows }) => (
          <div key={key} className='dialog-field'>
            <label>{label[activeTab]}</label>
            <textarea
              value={(data.content[activeTab] as any)[key] || ''}
              onChange={(e) => updateContent(activeTab, key, e.target.value)}
              rows={rows}
            />
          </div>
        ))}

        <div className='dialog-footer'>
          <button type='button' onClick={onCancel} disabled={isLoading}>Cancelar</button>
          <button type='submit' disabled={isLoading}>
            {isLoading ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </form>
    </Dialog>
  );
}
