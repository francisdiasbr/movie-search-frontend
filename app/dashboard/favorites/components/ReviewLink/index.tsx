import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { fetchAuthoralReview } from '../../../../../lib/features/authoralReview/authoralReviewSlice';
import { useAppDispatch } from '../../../../../lib/hooks';

interface ReviewLinkProps {
  reviewPath?: string | null;
  tconst: string;
}

export default function ReviewLink({ reviewPath: propReviewPath, tconst }: ReviewLinkProps) {
  const [reviewPath, setReviewPath] = useState<string | null>(propReviewPath ?? null);
  const [isChecking, setIsChecking] = useState(propReviewPath === undefined);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (propReviewPath !== undefined) {
      setReviewPath(propReviewPath);
      setIsChecking(false);
      return;
    }

    const checkReview = async () => {
      try {
        const action = await dispatch(fetchAuthoralReview(tconst));
        if (fetchAuthoralReview.fulfilled.match(action) && action.payload) {
          setReviewPath(`/dashboard/reviews/${tconst}`);
        } else {
          setReviewPath(null);
        }
      } catch {
        setReviewPath(null);
      } finally {
        setIsChecking(false);
      }
    };

    checkReview();
  }, [dispatch, tconst, propReviewPath]);

  if (isChecking || !reviewPath) return null;

  return (
    <Link
      to={reviewPath}
      style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
    >
      ver
    </Link>
  );
}
