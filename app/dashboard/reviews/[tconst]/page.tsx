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
  const { data } = useAppSelector((state: RootState) => state.authoralReviews);

  useEffect(() => {
    if (typeof movieId === 'string') {
      dispatch(fetchAllAuthoralReviews({ page: 1, pageSize: 50 }));
      dispatch(fetchAuthoralReview(movieId));
    }
    return () => {
      dispatch(clearAuthoralReviewStatus());
    };
  }, [dispatch, movieId]);

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
        {data.content.pt.text}
      </div>
    </>
  );
}

export default Reviews;
