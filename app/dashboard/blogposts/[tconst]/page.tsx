import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

import { fetchBlogPost, clearBlogPost, updateBlogPost, BlogPostEntry } from '../../../../lib/features/blogPosts/blogPostsSlice';
import { fetchAllImageUrls, uploadMovieImage, deleteImage, updateImageSubtitle } from '../../../../lib/features/uploadImages/uploadImagesSlice';
import { useAppDispatch, useAppSelector } from '../../../../lib/hooks';
import { RootState } from '../../../../lib/store';
import GoBack from '../../../ui/GoBack';
import BlogPostEditModal from './edit/blogPostEditModal';
import * as S from './styles';

function BlogPost() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { tconst: movieId } = useParams();
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state: RootState) => state.blogPosts);
  const { imageUrls, status, uploadStatus, imageNames, imageSubtitles_en, imageSubtitles_pt, subtitleStatus } = useAppSelector((state: RootState) => state.uploadImages);
  const [isOpen, setIsOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<string | null>(null);
  const [subtitle_en, setSubtitle_en] = useState('');
  const [subtitle_pt, setSubtitle_pt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (typeof movieId === 'string') {
      dispatch(fetchBlogPost(movieId));
      dispatch(fetchAllImageUrls({ tconst: movieId }));
    }
    return () => {
      dispatch(clearBlogPost());
    };
  }, [dispatch, movieId]);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && typeof movieId === 'string') {
      await dispatch(uploadMovieImage({ tconst: movieId, file }));
      dispatch(fetchAllImageUrls({ tconst: movieId }));
    }
  };

  const handleDeleteImage = async (filename: string) => {
    if (typeof movieId === 'string') {
      await dispatch(deleteImage({ tconst: movieId, filename }));
      dispatch(fetchAllImageUrls({ tconst: movieId }));
    }
  };

  const handleEditImage = (filename: string, currentSubtitle: string) => {
    setEditingImage(filename);
    setSubtitle_en(currentSubtitle || '');
    setSubtitle_pt(currentSubtitle || '');
  };

  const handleSaveSubtitle = async (filename: string) => {
    if (typeof movieId === 'string') {
      try {
        await dispatch(updateImageSubtitle({ tconst: movieId, filename, subtitle_en, subtitle_pt }));
        setEditingImage(null);
        dispatch(fetchAllImageUrls({ tconst: movieId }));
      } catch (error) {}
    }
  };

  const handleEdit = async (updatedData: BlogPostEntry) => {
    if (!data || !updatedData) return;
    setIsLoading(true);
    try {
      await dispatch(updateBlogPost(updatedData));
      setIsOpen(false);
      if (typeof movieId === 'string') {
        dispatch(fetchBlogPost(movieId));
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  if (!data) return null;

  const isLoadingImages = status === 'loading';
  const hasImages = imageUrls && imageUrls.length > 0;

  return (
    <S.PageContainer>
      <GoBack />
      <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between', marginBottom: '20px', width: '100%' }}>
        <h1>{data.primaryTitle}</h1>
        <button onClick={() => setIsOpen(true)} disabled={isLoading}>
          <FaEdit /> {isLoading ? 'Salvando...' : 'Editar Resenha'}
        </button>
      </div>
      <S.Container>
        <S.ContentColumn>
          <S.FlexContainer>
            <div>
              <h2>{data.content.pt.title}</h2>
              <p>{data.created_at}</p>
            </div>
          </S.FlexContainer>
          <Section title='Introdução' content={data.content.pt.introduction} />
          <Section title='Resumo do Filme' content={data.content.pt.plot_summary} />
          <Section title='Análise de Atuação' content={data.content.pt.acting_analysis} />
          <Section title='Impressões pessoais' content={data.content.pt.personal_impressions} />
          <Section title='Recomendação' content={data.content.pt.recommendation} />
          <Section title='Análise Técnica' content={data.content.pt.technical_analysis} />
          <Section title='Trilha Sonora Original' content={data.original_movie_soundtrack} />
          <Section title='Referências' content={renderReferences(data.references) || null} />
        </S.ContentColumn>
        <S.ImageColumn>
          <div>
            {hasImages && (
              <div>
                {imageUrls.map((url, index) => (
                  <div key={index} style={{ position: 'relative', marginBottom: '20px' }}>
                    <img
                      src={url}
                      alt={`Imagem ${index + 1} do filme`}
                      style={{
                        aspectRatio: '3/2',
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        height: 'auto',
                        marginBottom: '0px',
                        marginTop: '10px',
                        objectFit: 'cover',
                        width: '100%',
                      }}
                    />
                    {imageSubtitles_pt?.[index] && editingImage !== imageNames[index] && (
                      <p style={{ color: '#666', fontSize: '14px', textAlign: 'center' }}>
                        {imageSubtitles_pt[index]}
                      </p>
                    )}
                    <div style={{ display: 'flex', gap: '8px', position: 'absolute', right: '8px', top: '8px' }}>
                      <button
                        onClick={() => handleEditImage(imageNames[index], imageSubtitles_en?.[index] || '')}
                        title='Editar imagem'
                      >
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDeleteImage(imageNames[index])} title='Deletar imagem'>
                        <FaTrash />
                      </button>
                    </div>
                    {editingImage === imageNames[index] && (
                      <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                        <input
                          placeholder='Legenda EN'
                          value={subtitle_en}
                          onChange={(e) => setSubtitle_en(e.target.value)}
                          style={{ flex: 1 }}
                        />
                        <input
                          placeholder='Legenda PT'
                          value={subtitle_pt}
                          onChange={(e) => setSubtitle_pt(e.target.value)}
                          style={{ flex: 1 }}
                        />
                        <button
                          onClick={() => handleSaveSubtitle(imageNames[index])}
                          disabled={subtitleStatus === 'loading'}
                        >
                          {subtitleStatus === 'loading' ? 'Salvando...' : 'Salvar'}
                        </button>
                        <button onClick={() => setEditingImage(null)} disabled={subtitleStatus === 'loading'}>
                          Cancelar
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {isLoadingImages && (
              <div style={{ margin: '20px 0', textAlign: 'center' }}>
                <p>Carregando imagens...</p>
              </div>
            )}

            <input
              type='file'
              ref={fileInputRef}
              onChange={handleFileChange}
              accept='image/*'
              style={{ display: 'none' }}
            />
            <button
              onClick={handleUploadClick}
              disabled={uploadStatus === 'loading'}
              style={{ width: '100%' }}
            >
              {uploadStatus === 'loading' ? 'Enviando...' : hasImages ? 'Adicionar mais imagens' : 'Adicionar imagem'}
            </button>
          </div>
        </S.ImageColumn>
      </S.Container>

      {isOpen && data && (
        <BlogPostEditModal
          initialData={data}
          onCancel={() => setIsOpen(false)}
          onSave={handleEdit}
        />
      )}
    </S.PageContainer>
  );
}

function renderReferences(references: string[] | null) {
  if (!references) return null;

  return (
    <>
      {references.map((reference, index) => (
        <div key={index} style={{ marginBottom: '1px' }}>
          <a href={reference} target='_blank' rel='noopener noreferrer'>
            {reference}
          </a>
        </div>
      ))}
    </>
  );
}

function Section({ title, content }: { title: string; content: string | JSX.Element | null }) {
  if (!content) return null;

  return (
    <S.SectionContainer>
      <div>
        <S.SectionTitle>{title}</S.SectionTitle>
        <p>{content}</p>
      </div>
    </S.SectionContainer>
  );
}

export default BlogPost;
