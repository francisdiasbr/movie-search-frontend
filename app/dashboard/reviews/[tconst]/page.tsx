import { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../../lib/hooks';
import { useAsyncAction } from '../../../hooks/useAsyncAction';
import { useFilePicker } from '../../../hooks/useFilePicker';
import Button from '../../../ui/Button';
import Card from '../../../ui/Card';
import PageHeader from '../../../ui/PageHeader';
import GoBack from '../../components/GoBack';
import { clearState, fetchAuthoralReview, updateAuthoralReview } from '../reducer/authoralReviewSlice';
import { deleteImage, fetchImages, updateImageSubtitle, uploadMovieImage } from '../reducer/imagesSlice';
import LanguageCard from './components/LanguageCard';
import ReviewImageCard from './components/ReviewImageCard';
import * as S from './styles';

export default function ReviewPage() {
  const { tconst } = useParams() as { tconst: string };
  const dispatch = useAppDispatch();
  const { data, status } = useAppSelector(state => state.review);
  const { images, uploadStatus } = useAppSelector(state => state.reviewImages);
  const [isEditing, setIsEditing] = useState(false);
  const [editPt, setEditPt] = useState('');
  const [editEn, setEditEn] = useState('');

  useEffect(() => {
    dispatch(fetchAuthoralReview(tconst));
    dispatch(fetchImages({ tconst }));
    return () => {
      dispatch(clearState());
    };
  }, [dispatch, tconst]);

  const handleEditOpen = () => {
    setEditPt(data?.content?.pt?.text ?? '');
    setEditEn(data?.content?.en?.text ?? '');
    setIsEditing(true);
  };

  const { loading: isSaving, run: handleEditSubmit } = useAsyncAction(async (e?: React.SyntheticEvent) => {
    e?.preventDefault();
    await dispatch(updateAuthoralReview({ tconst, data: { content: { pt: { text: editPt }, en: { text: editEn } } } }));
    setIsEditing(false);
  });

  const filePicker = useFilePicker(file => dispatch(uploadMovieImage({ tconst, file })));

  if (status === 'loading') return <div>Carregando...</div>;
  if (!data) return null;
  if (!data.content?.pt?.text && !data.content?.en?.text) return <p>Nenhuma resenha encontrada!</p>;

  const hasImages = images.length > 0;

  return (
    <S.Page>
      <PageHeader
        title={data.primaryTitle}
        actions={
          isEditing ? (
            <>
              <Button variant='outline' onClick={() => setIsEditing(false)} disabled={isSaving}>
                Cancelar
              </Button>
              <Button onClick={handleEditSubmit} loading={isSaving}>
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

      <S.LanguageGrid onSubmit={handleEditSubmit}>
        <LanguageCard
          badge='PT'
          editing={isEditing}
          onChange={setEditPt}
          text={data.content?.pt?.text}
          title='Português'
          value={editPt}
        />
        <LanguageCard
          badge='EN'
          editing={isEditing}
          onChange={setEditEn}
          text={data.content?.en?.text}
          title='English'
          value={editEn}
        />
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
              <ReviewImageCard
                image={image}
                key={image.filename}
                onDelete={filename => dispatch(deleteImage({ tconst, filename }))}
                onSaveCaption={(filename, subtitle) => dispatch(updateImageSubtitle({ tconst, filename, subtitle }))}
                position={index + 1}
              />
            ))}
          </S.ImagesGrid>
        ) : (
          <S.EmptyText>Nenhuma imagem ainda.</S.EmptyText>
        )}
      </Card>
    </S.Page>
  );
}
