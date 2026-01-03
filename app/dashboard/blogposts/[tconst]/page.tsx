'use client';

import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Button, IconButton, Box, Input, useDisclosure } from '@chakra-ui/react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

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
  const { isOpen, onOpen, onClose } = useDisclosure();
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
        await dispatch(updateImageSubtitle({
          tconst: movieId,
          filename,
          subtitle_en: subtitle_en,
          subtitle_pt: subtitle_pt
        }));
        setEditingImage(null); // Fecha o input após salvar
        dispatch(fetchAllImageUrls({ tconst: movieId })); // Atualiza a lista de imagens
      } catch (error) {
        console.error('Erro ao salvar legenda:', error);
      }
    }
  };

  const handleEdit = async (updatedData: BlogPostEntry) => {
    if (!data || !updatedData) return;
    
    setIsLoading(true);
    try {
      await dispatch(updateBlogPost(updatedData));
      onClose();
      // Recarrega os dados atualizados
      if (typeof movieId === 'string') {
        dispatch(fetchBlogPost(movieId));
      }
    } catch (error) {
      console.error('Erro ao atualizar resenha:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!data) return null;

  const isLoadingImages = status === 'loading';
  const isUploadingImage = uploadStatus === 'loading';
  const hasImages = imageUrls && imageUrls.length > 0;

  return (
    <S.PageContainer>
      <GoBack />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>{data.primaryTitle}</h1>
        <Button
          leftIcon={<EditIcon />}
          onClick={onOpen}
          isLoading={isLoading}
          loadingText="Salvando..."
        >
          Editar Resenha
        </Button>
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
                      width={1500}
                      height={1000}
                      style={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        marginBottom: '0px',
                        marginTop: '10px',
                        objectFit: 'cover',
                        aspectRatio: '3/2'
                      }}
                    />
                    {imageSubtitles_pt && imageSubtitles_pt[index] && editingImage !== imageNames[index] && (
                      <p style={{
                        fontSize: '14px',
                        color: '#666',
                        textAlign: 'center'
                      }}>
                        {imageSubtitles_pt[index]}
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
                        onClick={() => handleEditImage(imageNames[index], imageSubtitles_en[index] || '')}
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
                          value={subtitle_en}
                          onChange={(e) => setSubtitle_en(e.target.value)}
                          size="sm"
                          flex={1}
                        />
                        <Input
                          placeholder="Digite a legenda da imagem"
                          value={subtitle_pt}
                          onChange={(e) => setSubtitle_pt(e.target.value)}
                          size="sm"
                          flex={1}
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

            <Input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              style={{ display: 'none' }}
              flex={1}
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

      {isOpen && data && (
        <BlogPostEditModal
          initialData={data}
          onSave={handleEdit}
          onCancel={onClose}
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
