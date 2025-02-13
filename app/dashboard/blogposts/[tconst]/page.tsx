'use client';

import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Button, IconButton, Box, Input } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

import { fetchBlogPost, clearBlogPost } from '../../../../lib/features/blogPosts/blogPostsSlice';
import { fetchAllImageUrls, uploadMovieImage, deleteImage, updateImageSubtitle } from '../../../../lib/features/uploadImages/uploadImagesSlice';
import { useAppDispatch, useAppSelector } from '../../../../lib/hooks';
import { RootState } from '../../../../lib/store';
import GoBack from '../../../ui/GoBack';
import * as S from './styles';

function BlogPost() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { tconst: movieId } = useParams();
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector((state: RootState) => state.blogPosts);
  const { imageUrls, status, uploadStatus, imageNames, imageSubtitles, subtitleStatus } = useAppSelector((state: RootState) => state.uploadImages);
  const [editingImage, setEditingImage] = useState<string | null>(null);
  const [subtitle, setSubtitle] = useState('');

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

  const handleEditImage = (filename: string) => {
    setEditingImage(filename);
    setSubtitle(''); // Limpa o input quando começa a editar
  };

  const handleSaveSubtitle = async (filename: string) => {
    if (typeof movieId === 'string') {
      try {
        await dispatch(updateImageSubtitle({
          tconst: movieId,
          filename,
          subtitle
        }));
        setEditingImage(null); // Fecha o input após salvar
        dispatch(fetchAllImageUrls({ tconst: movieId })); // Atualiza a lista de imagens
      } catch (error) {
        console.error('Erro ao salvar legenda:', error);
      }
    }
  };

  if (!data) return null;

  const isLoadingImages = status === 'loading';
  const isUploadingImage = uploadStatus === 'loading';
  const hasImages = imageUrls && imageUrls.length > 0;

  return (
    <>
      <GoBack />
      <h1>{data.primaryTitle}</h1>
      <S.Container>
        <S.ContentColumn>
          <S.FlexContainer>
            <div>
              <h2>{data.content.pt.title}</h2>
              <p>{data.created_at}</p>
            </div>
          </S.FlexContainer>
          <Section title='Introdução' content={data.content.pt.introduction} />
          <Section title='Elenco e Personagens' content={data.content.pt.stars_and_characters} />
          <Section title='Contexto Histórico' content={data.content.pt.historical_context} />
          <Section title='Importância Cultural' content={data.content.pt.cultural_importance} />
          <Section title='Análise Técnica' content={data.content.pt.technical_analysis} />
          <Section title='Trilha Sonora Original' content={data.original_movie_soundtrack} />
          <Section title='Referências' content={renderReferences(data.references) || null} />
          <Section title='Conclusão' content={data.content.pt.conclusion} />
        </S.ContentColumn>
        <S.ImageColumn>
          <div>
            {hasImages && (
              <div>
                {imageUrls.map((url, index) => (
                  <div
                    key={index}
                    style={{
                      position: 'relative',
                      marginBottom: '20px'
                    }}
                  >
                    <img
                      src={url}
                      alt={`Imagem ${index + 1} do filme`}
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
                        // marginTop: '8px',
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
                      <Box mt={2} display="flex" gap={2}>
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
                    )}
                  </div>
                ))}
              </div>
            )}

            {isLoadingImages && (
              <div style={{ textAlign: 'center', margin: '20px 0' }}>
                <p>Carregando imagens...</p>
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
              {hasImages ? 'Adicionar mais imagens' : 'Adicionar imagem'}
            </Button>
          </div>
        </S.ImageColumn>
      </S.Container>
    </>
  );
}

function renderReferences(references: string[] | null) {
  if (!references) return null;

  return (
    <>
      {references.map((reference, index) => (
        <div key={index} style={{ marginBottom: '1px' }}>
          <a
            href={reference}
            target='_blank'
            rel='noopener noreferrer'
            style={{ color: 'blue', textDecoration: 'underline' }}
          >
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
        <S.SectionContent>{content}</S.SectionContent>
      </div>
    </S.SectionContainer>
  );
}

export default BlogPost;
