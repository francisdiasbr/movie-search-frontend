'use client';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';

import GoBack from '../../../../app/ui/GoBack';
import {
  fetchBlogPost,
  clearBlogPost,
} from '../../../../lib/features/blogPosts/blogPostsSlice';
import { useAppDispatch, useAppSelector } from '../../../../lib/hooks';
import { RootState } from '../../../../lib/store';
import * as S from './styles';
import { fetchBlogPostTrivia } from '../../../../lib/features/blogPosts/blogPostsTriviaSlice';

function BlogPost() {
  const { tconst: movieId } = useParams();
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector(
    (state: RootState) => state.blogPosts
  );
  const triviaData = useAppSelector(
    (state: RootState) => state.blogPostsTrivia.data
  );

  useEffect(() => {
    if (typeof movieId === 'string') {
      dispatch(fetchBlogPost(movieId));
      dispatch(fetchBlogPostTrivia(movieId));
    }

    return () => {
      dispatch(clearBlogPost());
    };
  }, [dispatch, movieId]);

  if (!data) return null;

  return (
    <S.PageContainer>
      <GoBack centerText={data.primaryTitle} />
      <S.Container>
        <S.FlexContainer>
          <div>
            <p>{data.title}</p>
            <p>{data.created_at}</p>
          </div>
        </S.FlexContainer>
        {data.poster_url && (
          <S.PosterWrapper>
            <S.PosterImage src={data.poster_url} alt={data.primaryTitle} />
          </S.PosterWrapper>
        )}
        <div></div>
        <Section title='Introdução' content={data.introduction} />
        <Section
          title='Elenco e Personagens'
          content={data.stars_and_characters}
        />
        <Section title='Contexto Histórico' content={data.historical_context} />
        <Section
          title='Importância Cultural'
          content={data.cultural_importance}
        />
        <Section title='Análise Técnica' content={data.technical_analysis} />
        <Section
          title='Trilha Sonora Original'
          content={data.original_movie_soundtrack}
        />
        <Section title='Conclusão' content={data.conclusion} />
        {triviaData && (
          <>
            <Section title='Histórico do Diretor' content={triviaData.director_history} />
            <Section title='Citações do Diretor' content={triviaData.director_quotes} />
            <Section title='Curiosidades' content={triviaData.curiosities} />
            <Section title='Recepção' content={triviaData.reception} />
            <Section title='Destaques' content={triviaData.highlights} />
            <Section title='Enredo' content={triviaData.plot} />
          </>
        )}
      </S.Container>
    </S.PageContainer>
  );
}

// Componente auxiliar para as seções
function Section({ title, content }: { title: string; content: string }) {
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
