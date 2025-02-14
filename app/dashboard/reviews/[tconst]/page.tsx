'use client';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';

import {
  clearAuthoralReviewStatus,
} from '../../../../lib/features/allAuthoralReviews/allAuthoralReviewsSlice';
import { fetchAuthoralReview } from '../../../../lib/features/authoralReview/authoralReviewSlice';
import { fetchAllImageUrls } from '../../../../lib/features/uploadImages/uploadImagesSlice';
import { useAppDispatch, useAppSelector } from '../../../../lib/hooks';
import { RootState } from '../../../../lib/store';
import GoBack from '../../../ui/GoBack';
import * as S from './styles';

function Reviews() {
  const { tconst: movieId } = useParams();
  const dispatch = useAppDispatch();
  const { data, status } = useAppSelector((state: RootState) => state.authoralReviews);
  const imageUrls = useAppSelector((state: RootState) => state.uploadImages.imageUrls);

  useEffect(() => {
    if (typeof movieId === 'string') {
      dispatch(fetchAuthoralReview(movieId));
      dispatch(fetchAllImageUrls({ tconst: movieId }));
    }
    return () => {
      dispatch(clearAuthoralReviewStatus());
    };
  }, [dispatch, movieId]);

  if (status === 'loading') return <div>Carregando...</div>;
  if (!data) return null;

  return (
    <S.Container>
      <S.ContentColumn>
        <GoBack />
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
      
      <S.ImageColumn>
        {imageUrls.map((url, index) => (
          <img key={index} src={url} alt={`Imagem ${index + 1} do filme`} style={{ width: '100%' }} />
        ))}
      </S.ImageColumn>
    </S.Container>
  );
}

export default Reviews;
