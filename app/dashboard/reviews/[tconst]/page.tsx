'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

import { clearAuthoralReviewStatus } from '../../../../lib/features/allAuthoralReviews/allAuthoralReviewsSlice';
import { fetchAuthoralReview, updateAuthoralReview } from '../../../../lib/features/authoralReview/authoralReviewSlice';
import {
  fetchAllImageUrls,
  uploadMovieImage,
  deleteImage,
  updateImageSubtitle,
} from '../../../../lib/features/uploadImages/uploadImagesSlice';
import { useAppDispatch, useAppSelector } from '../../../../lib/hooks';
import { RootState } from '../../../../lib/store';
import GoBack from '../../../ui/GoBack';
import ReviewEditModal from './edit/reviewEditModal';
import * as S from './styles';

function Reviews() {
  const { tconst: movieId } = useParams();
  const dispatch = useAppDispatch();
  const { data, status } = useAppSelector((state: RootState) => state.authoralReviews);
  const { imageUrls, uploadStatus, imageNames, imageSubtitles, subtitleStatus } =
    useAppSelector((state: RootState) => state.uploadImages);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editingImage, setEditingImage] = useState<string | null>(null);
  const [subtitle, setSubtitle] = useState('');
  const [isCoverImage, setIsCoverImage] = useState(false);

  useEffect(() => {
    if (typeof movieId === 'string') {
      dispatch(fetchAuthoralReview(movieId));
      dispatch(fetchAllImageUrls({ tconst: movieId }));
    }
    return () => {
      dispatch(clearAuthoralReviewStatus());
    };
  }, [dispatch, movieId]);

  const handleEdit = async (content: { pt?: { text: string }; en?: { text: string } }) => {
    setIsLoading(true);
    try {
      await dispatch(
        updateAuthoralReview({
          tconst: movieId as string,
          data: {
            data: {
              content: {
                pt: { text: content.pt?.text || '' },
                en: { text: content.en?.text || '' },
              },
            },
          },
        })
      );
      setIsOpen(false);
      dispatch(fetchAuthoralReview(movieId as string));
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

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

  const handleEditImage = (filename: string) => {
    setEditingImage(filename);
    setSubtitle('');
  };

  const handleSaveSubtitle = async (filename: string) => {
    if (typeof movieId === 'string') {
      try {
        await dispatch(updateImageSubtitle({ tconst: movieId, filename, subtitle }));
        setEditingImage(null);
        dispatch(fetchAllImageUrls({ tconst: movieId }));
      } catch (error) {}
    }
  };

  if (status === 'loading') return <div>Carregando...</div>;
  if (!data) return null;

  return (
    <S.PageContainer>
      <S.ContentColumn>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <GoBack />
        </div>
        <h1>{data.primaryTitle}</h1>
        <div>
          {data.content?.pt?.text ? (
            <S.SectionContainer>
              <S.SectionTitle>Português</S.SectionTitle>
              <S.SectionContent>{data.content.pt.text}</S.SectionContent>
            </S.SectionContainer>
          ) : null}

          {data.content?.en?.text ? (
            <S.SectionContainer>
              <S.SectionTitle>English</S.SectionTitle>
              <S.SectionContent>{data.content.en.text}</S.SectionContent>
            </S.SectionContainer>
          ) : null}

          {!data.content?.pt?.text && !data.content?.en?.text && <div>Nenhuma resenha encontrada!</div>}
        </div>
      </S.ContentColumn>
      <button onClick={() => setIsOpen(true)} disabled={isLoading}>
        <FaEdit /> {isLoading ? 'Salvando...' : 'Editar Resenha'}
      </button>
      <S.ImageColumn>
        <div>
          {imageUrls && imageUrls.length > 0 && (
            <div>
              {imageUrls.map((url, index) => (
                <div key={index} style={{ position: 'relative', marginBottom: '20px' }}>
                  <Image
                    src={url}
                    alt={`Imagem ${index + 1} do filme`}
                    width={800}
                    height={600}
                    style={{
                      borderRadius: '8px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      height: 'auto',
                      marginBottom: '0px',
                      marginTop: '10px',
                      width: '100%',
                    }}
                  />
                  {imageSubtitles?.[index] && (
                    <p style={{ color: '#666', fontSize: '14px', textAlign: 'center' }}>
                      {imageSubtitles[index]}
                    </p>
                  )}
                  <div style={{ display: 'flex', gap: '8px', position: 'absolute', right: '8px', top: '8px' }}>
                    <button onClick={() => handleEditImage(imageNames[index])} title='Editar imagem'>
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDeleteImage(imageNames[index])} title='Deletar imagem'>
                      <FaTrash />
                    </button>
                  </div>
                  {editingImage === imageNames[index] && (
                    <div style={{ marginTop: '8px' }}>
                      <div style={{ marginBottom: '8px' }}>
                        <label>
                          <input
                            type='checkbox'
                            checked={isCoverImage}
                            onChange={(e) => setIsCoverImage(e.target.checked)}
                            style={{ marginRight: '6px' }}
                          />
                          Imagem de capa
                        </label>
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <input
                          placeholder='Digite a legenda da imagem'
                          value={subtitle}
                          onChange={(e) => setSubtitle(e.target.value)}
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
                    </div>
                  )}
                </div>
              ))}
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
            {uploadStatus === 'loading'
              ? 'Enviando...'
              : imageUrls && imageUrls.length > 0
              ? 'Adicionar mais imagens'
              : 'Adicionar imagem'}
          </button>
        </div>
      </S.ImageColumn>

      {isOpen && (
        <ReviewEditModal
          initialContent={data.content || { pt: { text: '' }, en: { text: '' } }}
          onCancel={() => setIsOpen(false)}
          onSave={handleEdit}
        />
      )}
    </S.PageContainer>
  );
}

export default Reviews;
