import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

import { clearState, fetchAuthoralReview, updateAuthoralReview } from '../reducer/authoralReviewSlice';
import { deleteImage, fetchImages, updateImageSubtitle, uploadMovieImage } from '../reducer/imagesSlice';
import { useAppDispatch, useAppSelector } from '../../../../lib/hooks';
import { useAsyncAction } from '../../../hooks/useAsyncAction';
import { useFilePicker } from '../../../hooks/useFilePicker';
import { RootState } from '../../../../lib/store';
import Button from '../../../ui/Button';
import Card from '../../../ui/Card';
import IconButton from '../../../ui/IconButton';
import PageHeader from '../../../ui/PageHeader';
import GoBack from '../../components/GoBack';
import * as S from './styles';

function Reviews() {
  const { tconst: movieId } = useParams();
  const dispatch = useAppDispatch();
  const { data, status } = useAppSelector((state: RootState) => state.authoralReviews);
  const { images, uploadStatus, subtitleStatus } = useAppSelector((state: RootState) => state.reviewImages);
  const [isEditing, setIsEditing] = useState(false);
  const [editPt, setEditPt] = useState('');
  const [editEn, setEditEn] = useState('');
  const [editingImage, setEditingImage] = useState<string | null>(null);
  const [subtitle, setSubtitle] = useState('');

  useEffect(() => {
    if (typeof movieId === 'string') {
      dispatch(fetchAuthoralReview(movieId));
      dispatch(fetchImages({ tconst: movieId }));
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

  const { loading: isLoading, run: handleEditSubmit } = useAsyncAction(async (e?: React.SyntheticEvent) => {
    e?.preventDefault();
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
  });

  const filePicker = useFilePicker(async file => {
    if (typeof movieId !== 'string') return;
    await dispatch(uploadMovieImage({ tconst: movieId, file }));
    dispatch(fetchImages({ tconst: movieId }));
  });

  const handleDeleteImage = async (filename: string) => {
    if (typeof movieId === 'string') {
      await dispatch(deleteImage({ tconst: movieId, filename }));
      dispatch(fetchImages({ tconst: movieId }));
    }
  };

  const handleEditImage = (filename: string) => {
    setEditingImage(filename);
    setSubtitle('');
  };

  const handleSaveSubtitle = async (filename: string) => {
    if (typeof movieId === 'string') {
      await dispatch(updateImageSubtitle({ tconst: movieId, filename, subtitle_en: subtitle, subtitle_pt: subtitle }));
      setEditingImage(null);
      dispatch(fetchImages({ tconst: movieId }));
    }
  };

  if (status === 'loading') return <div>Carregando...</div>;
  if (!data) return null;
  if (!data.content?.pt?.text && !data.content?.en?.text) return <p>Nenhuma resenha encontrada!</p>;

  const hasImages = images.length > 0;

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
      <PageHeader
        title={data.primaryTitle}
        actions={
          isEditing ? (
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
          )
        }
      >
        <GoBack />
      </PageHeader>

      <S.LanguageGrid as={isEditing ? 'form' : 'div'} onSubmit={isEditing ? handleEditSubmit : undefined}>
        {renderLanguageCard('PT', 'Português', data.content?.pt?.text, editPt, setEditPt)}
        {renderLanguageCard('EN', 'English', data.content?.en?.text, editEn, setEditEn)}
      </S.LanguageGrid>

      <Card
        title='Imagens'
        actions={
          <Button variant='secondary' size='small' onClick={filePicker.open} loading={uploadStatus === 'loading'}>
            {hasImages ? 'Adicionar mais imagens' : 'Adicionar imagem'}
          </Button>
        }
      >
        {filePicker.input}
        {hasImages ? (
          <S.ImagesGrid>
            {images.map((image, index) => (
              <S.ImageWrapper key={image.filename}>
                <S.ReviewImage src={image.url} alt={image.subtitle_pt || `Imagem ${index + 1} do filme`} />
                {image.subtitle_pt && <S.ImageCaption>{image.subtitle_pt}</S.ImageCaption>}
                <S.ImageActions>
                  <IconButton icon={FaEdit} onClick={() => handleEditImage(image.filename)} title='Editar legenda' />
                  <IconButton icon={FaTrash} onClick={() => handleDeleteImage(image.filename)} title='Deletar imagem' />
                </S.ImageActions>
                {editingImage === image.filename && (
                  <S.CaptionForm>
                    <input
                      placeholder='Escreva a legenda para a imagem'
                      value={subtitle}
                      onChange={(e) => setSubtitle(e.target.value)}
                    />
                    <Button size='small' onClick={() => handleSaveSubtitle(image.filename)} loading={subtitleStatus === 'loading'}>
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
