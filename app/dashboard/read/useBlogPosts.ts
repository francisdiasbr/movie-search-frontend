import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import { ROUTES } from '../../const';
import { clearReviews, fetchReviews } from './reducer/readSlice';

export function useBlogPosts() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { entries, status } = useAppSelector(state => state.read);

  useEffect(() => () => {
    dispatch(clearReviews());
  }, [dispatch]);

  const handleSearch = useCallback(() => dispatch(fetchReviews()), [dispatch]);

  const handleCardClick = (tconst: string) => {
    navigate(ROUTES.review(tconst));
  };

  return {
    allEntries: entries,
    handleCardClick,
    handleSearch,
    loading: status === 'loading',
  };
}
