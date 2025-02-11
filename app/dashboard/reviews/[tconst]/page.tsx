'use client';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';

import {
  fetchAllAuthoralReviews,
  clearAuthoralReviewStatus,
} from '../../../../lib/features/allAuthoralReviews/allAuthoralReviewsSlice';
import { fetchAuthoralReview } from '../../../../lib/features/authoralReview/authoralReviewSlice';
import { fetchAllImageUrls, selectImageUrls } from '../../../../lib/features/uploadImages/uploadImagesSlice';
import { useAppDispatch, useAppSelector } from '../../../../lib/hooks';
import { RootState } from '../../../../lib/store';
import GoBack from '../../../ui/GoBack';

function Reviews() {
  const { tconst: movieId } = useParams();
  const dispatch = useAppDispatch();
  const { data, status } = useAppSelector((state: RootState) => state.authoralReviews);

  useEffect(() => {
    if (typeof movieId === 'string') {
      dispatch(fetchAuthoralReview(movieId));
    }
    return () => {
      dispatch(clearAuthoralReviewStatus());
    };
  }, [dispatch, movieId]);

  if (status === 'loading') return <div>Carregando...</div>;
  if (!data) return null;

  return (
    <>
      <GoBack />
      <h1>{data.primaryTitle}</h1>
      <div
        style={{
          whiteSpace: 'pre-wrap',
          maxWidth: '800px',
          margin: '0 auto',
          lineHeight: '1.6',
        }}
      >
        {data.content?.pt?.text ? (
          <>
            <h2>Português</h2>
            <div>{data.content.pt.text}</div>
          </>
        ) : null}

        {data.content?.en?.text ? (
          <>
            <h2>English</h2>
            <div>{data.content.en.text}</div>
          </>
        ) : null}

        {!data.content?.pt?.text && !data.content?.en?.text && <div>Nenhuma resenha encontrada!</div>}
      </div>
    </>
  );
}

export default Reviews;
