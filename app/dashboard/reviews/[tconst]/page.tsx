'use client';

import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { Button, useDisclosure, IconButton, Box, Input, Checkbox } from '@chakra-ui/react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import {
  clearAuthoralReviewStatus,
} from '../../../../lib/features/allAuthoralReviews/allAuthoralReviewsSlice';
import { fetchAuthoralReview, updateAuthoralReview } from '../../../../lib/features/authoralReview/authoralReviewSlice';
import {
  fetchAllImageUrls,
  uploadMovieImage,
  deleteImage,
  updateImageSubtitle
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
  const { imageUrls, status: imageStatus, uploadStatus, imageNames, imageSubtitles, subtitleStatus } = 
    useAppSelector((state: RootState) => state.uploadImages);
  const { isOpen, onOpen, onClose } = useDisclosure();
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

  const handleEdit = async (content: { pt?: { text: string }, en?: { text: string } }) => {
    setIsLoading(true);
    try {
      await dispatch(updateAuthoralReview({ 
        tconst: movieId as string, 
        data: {
          data: {
            content: {
              pt: { text: content.pt?.text || '' },
              en: { text: content.en?.text || '' }
            }
          }
        }
      }));
      onClose();
      dispatch(fetchAuthoralReview(movieId as string));
    } catch (error) {
      console.error('Erro ao atualizar resenha:', error);
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
        await dispatch(updateImageSubtitle({
          tconst: movieId,
          filename,
          subtitle
        }));
        setEditingImage(null);
        dispatch(fetchAllImageUrls({ tconst: movieId }));
      } catch (error) {
        console.error('Erro ao salvar legenda:', error);
      }
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
      <Button
            leftIcon={<EditIcon />}
            onClick={onOpen}
            isLoading={isLoading}
            loadingText="Salvando..."
          >
            Editar Resenha
          </Button>
      <S.ImageColumn>
        <div>
          {imageUrls && imageUrls.length > 0 && (
            <div>
              {imageUrls.map((url, index) => (
                <div
                  key={index}
                  style={{
                    position: 'relative',
                    marginBottom: '20px'
                  }}
                >
                  <Image
                    src={url}
                    alt={`Imagem ${index + 1} do filme`}
                    width={800}
                    height={600}
                    style={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: '8px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      marginBottom: '0px',
                      marginTop: '10px'
                    }}
                  />
                  {imageSubtitles && imageSubtitles[index] && (
                    <p style={{
                      fontSize: '14px',
                      color: '#666',
                      textAlign: 'center'
                    }}>
                      {imageSubtitles[index]}
                    </p>
                  )}
                  <div
                    style={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      display: 'flex',
                      gap: '8px'
                    }}
                  >
                    <IconButton
                      aria-label="Editar imagem"
                      icon={<EditIcon />}
                      size="sm"
                      colorScheme="blue"
                      onClick={() => handleEditImage(imageNames[index])}
                    />
                    <IconButton
                      aria-label="Deletar imagem"
                      icon={<DeleteIcon />}
                      size="sm"
                      colorScheme="red"
                      onClick={() => handleDeleteImage(imageNames[index])}
                    />
                  </div>
                  {editingImage === imageNames[index] && (
                    <Box mt={2}>
                      <Checkbox
                        mb={2}
                        isChecked={isCoverImage}
                        onChange={(e) => setIsCoverImage(e.target.checked)}
                      >
                        Imagem de capa
                      </Checkbox>
                      <Box display="flex" gap={2}>
                        <Input
                          placeholder="Digite a legenda da imagem"
                          value={subtitle}
                          onChange={(e) => setSubtitle(e.target.value)}
                          size="sm"
                        />
                        <Button
                          size="sm"
                          colorScheme="green"
                          onClick={() => handleSaveSubtitle(imageNames[index])}
                          isLoading={subtitleStatus === 'loading'}
                          loadingText="Salvando..."
                        >
                          Salvar
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => setEditingImage(null)}
                          disabled={subtitleStatus === 'loading'}
                        >
                          Cancelar
                        </Button>
                      </Box>
                    </Box>
                  )}
                </div>
              ))}
            </div>
          )}

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: 'none' }}
          />
          <Button
            onClick={handleUploadClick}
            isLoading={uploadStatus === 'loading'}
            loadingText="Enviando..."
            width="100%"
            disabled={uploadStatus === 'loading'}
          >
            {imageUrls && imageUrls.length > 0 ? 'Adicionar mais imagens' : 'Adicionar imagem'}
          </Button>
        </div>
      </S.ImageColumn>

      {isOpen && (
        <ReviewEditModal
          initialContent={data.content || { pt: { text: '' }, en: { text: '' } }}
          onSave={handleEdit}
          onCancel={onClose}
        />
      )}
    </S.PageContainer>
  );
}

export default Reviews;
