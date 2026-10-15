import { useParams } from 'react-router-dom';
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
import Button from '../../../ui/Button';
import Card from '../../../ui/Card';
import GoBack from '../../components/GoBack';
import * as S from './styles';

function Reviews() {
  const { tconst: movieId } = useParams();
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

  const hasImages = Boolean(imageUrls && imageUrls.length > 0);

  const renderLanguageCard = (
    badge: string,
    title: string,
    text: string | undefined,
    editValue: string,
    onEditChange: (value: string) => void,
  ) => (
    <Card badge={badge} title={title}>
      {isEditing ? (
        <S.ReviewTextarea value={editValue} onChange={(e) => onEditChange(e.target.value)} />
      ) : text ? (
        <S.ReviewText>{text}</S.ReviewText>
      ) : (
        <S.EmptyText>Sem texto neste idioma.</S.EmptyText>
      )}
    </Card>
  );

  return (
    <S.Page>
      <S.PageHeader>
        <S.TitleGroup>
          <GoBack />
          <h1>{data.primaryTitle}</h1>
        </S.TitleGroup>
        <S.HeaderActions>
          {isEditing ? (
            <>
              <Button variant='outline' onClick={() => setIsEditing(false)} disabled={isLoading}>
                Cancelar
              </Button>
              <Button onClick={handleEditSubmit} loading={isLoading}>
                Salvar
              </Button>
            </>
          ) : (
            <Button iconLeft={FaEdit} onClick={handleEditOpen}>
              Editar
            </Button>
          )}
        </S.HeaderActions>
      </S.PageHeader>

      <S.LanguageGrid as={isEditing ? 'form' : 'div'} onSubmit={isEditing ? handleEditSubmit : undefined}>
        {renderLanguageCard('PT', 'Português', data.content?.pt?.text, editPt, setEditPt)}
        {renderLanguageCard('EN', 'English', data.content?.en?.text, editEn, setEditEn)}
      </S.LanguageGrid>

      <Card
        title='Imagens'
        actions={
          <Button variant='secondary' size='small' onClick={handleUploadClick} loading={uploadStatus === 'loading'}>
            {hasImages ? 'Adicionar mais imagens' : 'Adicionar imagem'}
          </Button>
        }
      >
        <S.HiddenFileInput type='file' ref={fileInputRef} onChange={handleFileChange} accept='image/*' />
        {hasImages ? (
          <S.ImagesGrid>
            {imageUrls.map((url, index) => (
              <S.ImageWrapper key={index}>
                <S.ReviewImage src={url} alt={`Imagem ${index + 1} do filme`} />
                {imageSubtitles_pt?.[index] && <S.ImageCaption>{imageSubtitles_pt[index]}</S.ImageCaption>}
                <S.ImageActions>
                  <button type='button' onClick={() => handleEditImage(imageNames[index])} title='Editar legenda'>
                    <FaEdit />
                  </button>
                  <button type='button' onClick={() => handleDeleteImage(imageNames[index])} title='Deletar imagem'>
                    <FaTrash />
                  </button>
                </S.ImageActions>
                {editingImage === imageNames[index] && (
                  <S.CaptionForm>
                    <input
                      placeholder='Escreva a legenda para a imagem'
                      value={subtitle}
                      onChange={(e) => setSubtitle(e.target.value)}
                    />
                    <Button size='small' onClick={() => handleSaveSubtitle(imageNames[index])} loading={subtitleStatus === 'loading'}>
                      Salvar
                    </Button>
                    <Button size='small' variant='outline' onClick={() => setEditingImage(null)} disabled={subtitleStatus === 'loading'}>
                      Cancelar
                    </Button>
                  </S.CaptionForm>
                )}
              </S.ImageWrapper>
            ))}
          </S.ImagesGrid>
        ) : (
          <S.EmptyText>Nenhuma imagem ainda.</S.EmptyText>
        )}
      </Card>
    </S.Page>
  );
}

export default Reviews;
