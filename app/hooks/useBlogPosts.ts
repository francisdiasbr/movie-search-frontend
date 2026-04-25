import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect } from 'react';

import {
  clearAuthoralReviewStatus,
  fetchAllAuthoralReviews,
} from '../../lib/features/allAuthoralReviews/allAuthoralReviewsSlice';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { RootState } from '../../lib/store';

export function useBlogPosts() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { entries, status } = useAppSelector((state: RootState) => state.allAuthoralReviews);

  useEffect(() => {
    dispatch(clearAuthoralReviewStatus());
    return () => {
      dispatch(clearAuthoralReviewStatus());
    };
  }, [dispatch]);

  const handleSearch = useCallback(async () => {
    try {
      await dispatch(fetchAllAuthoralReviews({ page: 1, pageSize: 50 }));
    } catch (error) {
      console.error('Erro ao buscar resenhas:', error);
    }
  }, [dispatch]);

  const handleCardClick = (tconst: string) => {
    navigate(`/dashboard/reviews/${tconst}`);
  };

  return {
    loading: status === 'loading',
    allEntries: entries || [],
    hasEntries: (entries?.length ?? 0) > 0,
    handleSearch,
    handleCardClick,
  };
}
