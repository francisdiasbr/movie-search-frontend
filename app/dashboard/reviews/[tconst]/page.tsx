import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

import { clearState, fetchAuthoralReview, updateAuthoralReview } from '../reducer/authoralReviewSlice';
import {
  fetchAllImageUrls,
  uploadMovieImage,
  deleteImage,
  updateImageSubtitle,
} from '../reducer/imagesSlice';
import { useAppDispatch, useAppSelector } from '../../../../lib/hooks';
import { RootState } from '../../../../lib/store';
import * as S from './styles';

function Reviews() {
  const { tconst: movieId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data, status } = useAppSelector((state: RootState) => state.authoralReviews);
  const { imageUrls, uploadStatus, imageNames, imageSubtitles_pt, subtitleStatus } =
    useAppSelector((state: RootState) => state.uploadImages);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editPt, setEditPt] = useState('');
  const [editEn, setEditEn] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editingImage, setEditingImage] = useState<string | null>(null);
  const [subtitle, setSubtitle] = useState('');

  useEffect(() => {
    if (typeof movieId === 'string') {
      dispatch(fetchAuthoralReview(movieId));
      dispatch(fetchAllImageUrls({ tconst: movieId }));
    }
    return () => {
      dispatch(clearState());
    };
  }, [dispatch, movieId]);

  const handleEditOpen = () => {
    setEditPt(data?.content?.pt?.text || '');
    setEditEn(data?.content?.en?.text || '');
    setIsEditing(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await dispatch(
        updateAuthoralReview({
          tconst: movieId as string,
          data: {
            content: {
              pt: { text: editPt },
              en: { text: editEn },
            },
          },
        })
      );
      setIsEditing(false);
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
        await dispatch(updateImageSubtitle({ tconst: movieId, filename, subtitle_en: subtitle, subtitle_pt: subtitle }));
        setEditingImage(null);
        dispatch(fetchAllImageUrls({ tconst: movieId }));
      } catch (error) { }
    }
  };

  if (status === 'loading') return <div>Carregando...</div>;
  if (!data) return null;
  if (!data.content?.pt?.text && !data.content?.en?.text) return <p>Nenhuma resenha encontrada!</p>;

  return (
    <div>
      <button onClick={() => navigate(-1)}>Voltar</button>
      <h1>{data.primaryTitle}</h1>

      {isEditing ? (
        <form onSubmit={handleEditSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label>Português</label>
            <textarea
              value={editPt}
              onChange={(e) => setEditPt(e.target.value)}
              rows={10}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label>English</label>
            <textarea
              value={editEn}
              onChange={(e) => setEditEn(e.target.value)}
              rows={10}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '8px', marginBottom: '16px' }}>
            <button type='button' onClick={() => setIsEditing(false)} disabled={isLoading}>
              Cancelar
            </button>
            <button type='submit' disabled={isLoading}>
              {isLoading ? 'Adicionando' : 'Salvar'}
            </button>
          </div>
        </form>
      ) : (
        <div>
          <button onClick={handleEditOpen}>Editar</button>
          {data.content?.pt?.text && (
            <div>
              <h2>Português</h2>
              <p>{data.content.pt.text}</p>
            </div>
          )}
          {data.content?.en?.text && (
            <div>
              <h2>Inglês</h2>
              <p>{data.content.en.text}</p>
            </div>
          )}
        </div>
      )}

      <div>
        {imageUrls?.map((url, index) => (
          <S.ImageWrapper key={index}>
            <S.ReviewImage src={url} alt={`Imagem ${index + 1} do filme`} />
            {imageSubtitles_pt?.[index] && <p>{imageSubtitles_pt[index]}</p>}
            <S.ImageActions>
              <button onClick={() => handleEditImage(imageNames[index])} title='Editar imagem'>
                <FaEdit />
              </button>
              <button onClick={() => handleDeleteImage(imageNames[index])} title='Deletar imagem'>
                <FaTrash />
              </button>
            </S.ImageActions>
            {editingImage === imageNames[index] && (
              <div>
                <input
                  placeholder='Escreva a legenda para a imagem'
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                />
                <button onClick={() => handleSaveSubtitle(imageNames[index])} disabled={subtitleStatus === 'loading'}>
                  {subtitleStatus === 'loading' ? 'Adicionando' : 'Salvar'}
                </button>
                <button onClick={() => setEditingImage(null)} disabled={subtitleStatus === 'loading'}>
                  Cancelar
                </button>
              </div>
            )}
          </S.ImageWrapper>
        ))}
        <S.HiddenFileInput type='file' ref={fileInputRef} onChange={handleFileChange} accept='image/*' />
        <button onClick={handleUploadClick} disabled={uploadStatus === 'loading'}>
          {uploadStatus === 'loading'
            ? 'Adicionando'
            : imageUrls && imageUrls.length > 0
              ? 'Adicionar mais imagens'
              : 'Adicionar imagem'}
        </button>
      </div>
    </div>
  );
}

export default Reviews;
