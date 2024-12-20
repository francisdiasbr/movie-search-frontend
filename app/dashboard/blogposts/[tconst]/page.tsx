'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

import {
  fetchBlogPost,
  clearBlogPost,
} from '../../../../lib/features/blogPosts/blogPostsSlice';
import { fetchBlogPostTrivia } from '../../../../lib/features/blogPosts/blogPostsTriviaSlice';
import {
  fetchAllImageUrls,
  selectImageUrls,
} from '../../../../lib/features/uploadImages/uploadImagesSlice';
import { useAppDispatch, useAppSelector } from '../../../../lib/hooks';
import { RootState } from '../../../../lib/store';
import GoBack from '../../../ui/GoBack';
import * as S from './styles';

function BlogPost() {
  const { tconst: movieId } = useParams();
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector(
    (state: RootState) => state.blogPosts
  );
  const triviaData = useAppSelector(
    (state: RootState) => state.blogPostsTrivia.data
  );
  const imageUrls = useAppSelector(selectImageUrls);

  useEffect(() => {
    if (typeof movieId === 'string') {
      dispatch(fetchBlogPost(movieId));
      dispatch(fetchBlogPostTrivia(movieId));
      dispatch(fetchAllImageUrls({ tconst: movieId }));
    }
    return () => {
      dispatch(clearBlogPost());
    };
  }, [dispatch, movieId]);

  if (!data) return null;

  return (
    <S.PageContainer>
      <GoBack />
      <h1>{data.primaryTitle}</h1>
      <S.Container>
        <S.ContentColumn>
          <S.FlexContainer>
            <div>
              <p>{data.title}</p>
              <p>{data.created_at}</p>
            </div>
          </S.FlexContainer>
          <Section title='Introdução' content={data.introduction} />
          <Section
            title='Elenco e Personagens'
            content={data.stars_and_characters}
          />
          <Section
            title='Contexto Histórico'
            content={data.historical_context}
          />
          <Section
            title='Importância Cultural'
            content={data.cultural_importance}
          />
          <Section title='Análise Técnica' content={data.technical_analysis} />
          <Section
            title='Trilha Sonora Original'
            content={data.original_movie_soundtrack}
          />
          <Section
            title='Referências'
            content={renderReferences(data.references) || null}
          />
          <Section title='Conclusão' content={data.conclusion} />
          {triviaData && (
            <>
              <Section
                title='Histórico do Diretor'
                content={triviaData.director_history}
              />
              <Section
                title='Citações do Diretor'
                content={triviaData.director_quotes}
              />
              <Section title='Curiosidades' content={triviaData.curiosities} />
              <Section title='Recepção' content={triviaData.reception} />
              <Section title='Destaques' content={triviaData.highlights} />
              <Section title='Enredo' content={triviaData.plot} />
            </>
          )}
          {/* {data.poster_url && (
            <S.PosterWrapper>
              <S.PosterImage src={data.poster_url} alt={data.primaryTitle} />
            </S.PosterWrapper>
          )} */}
        </S.ContentColumn>
        <S.ImageColumn>
          <div>
            {imageUrls.map((url, index) => (
              <Image
                key={index}
                src={url}
                alt={`Imagem ${index + 1}`}
                width={406}
                height={295}
                layout='fixed'
              />
            ))}
          </div>
        </S.ImageColumn>
      </S.Container>
    </S.PageContainer>
  );
}

function renderReferences(references: string[] | null) {
  if (!references) return null;

  return (
    <>
      {references.map((reference, index) => (
        <div key={index}>
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

function Section({
  title,
  content,
}: {
  title: string;
  content: string | JSX.Element | null;
}) {
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
