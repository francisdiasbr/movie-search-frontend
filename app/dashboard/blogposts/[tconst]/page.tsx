'use client';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';

import { fetchBlogPost, clearBlogPost } from '../../../../lib/features/blogPosts/blogPostsSlice';
import { fetchAllImageUrls } from '../../../../lib/features/uploadImages/uploadImagesSlice';
import { useAppDispatch, useAppSelector } from '../../../../lib/hooks';
import { RootState } from '../../../../lib/store';
import GoBack from '../../../ui/GoBack';
import * as S from './styles';

function BlogPost() {
  const { tconst: movieId } = useParams();
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector((state: RootState) => state.blogPosts);
  const { imageUrls, status: imageStatus } = useAppSelector((state: RootState) => state.uploadImages);

  useEffect(() => {
    if (typeof movieId === 'string') {
      dispatch(fetchBlogPost(movieId));
      dispatch(fetchAllImageUrls({ tconst: movieId }));
    }
    return () => {
      dispatch(clearBlogPost());
    };
  }, [dispatch, movieId]);

  if (!data) return null;

  const isLoadingImages = imageStatus === 'loading';
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
          {isLoadingImages ? (
            <p>Carregando imagens...</p>
          ) : hasImages ? (
            <div>
              {imageUrls.map((url, index) => (
                <img 
                  key={index} 
                  src={url} 
                  alt={`Imagem ${index + 1} do filme`}
                  style={{
                    width: '100%',
                    height: 'auto',
                    marginBottom: '20px',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                />
              ))}
            </div>
          ) : (
            <p>Nenhuma imagem disponível</p>
          )}
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
        <div key={index} style={{ marginBottom: '10px' }}>
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
