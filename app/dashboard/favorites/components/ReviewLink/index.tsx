'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { fetchAuthoralReview } from '../../../../../lib/features/authoralReview/authoralReviewSlice';
import { fetchBlogPost } from '../../../../../lib/features/blogPosts/blogPostsSlice';
import { useAppDispatch } from '../../../../../lib/hooks';

interface ReviewLinkProps {
  tconst: string;
  reviewPath?: string | null;
}

export default function ReviewLink({ tconst, reviewPath: propReviewPath }: ReviewLinkProps) {
  const [reviewPath, setReviewPath] = useState<string | null>(propReviewPath || null);
  const [isChecking, setIsChecking] = useState(!propReviewPath);
  const dispatch = useAppDispatch();

  // Se reviewPath foi passado como prop, usa ele (dados pré-carregados)
  useEffect(() => {
    if (propReviewPath !== undefined) {
      setReviewPath(propReviewPath);
      setIsChecking(false);
      return;
    }
  }, [propReviewPath]);

  // Se não recebeu reviewPath como prop, faz a verificação (fallback)
  useEffect(() => {
    if (propReviewPath !== undefined) {
      return; // Já foi definido pela prop
    }

    const checkReview = async () => {
      try {
        // Verifica se existe uma resenha autoral primeiro
        const authoralAction = await dispatch(fetchAuthoralReview(tconst));
        if (fetchAuthoralReview.fulfilled.match(authoralAction) && authoralAction.payload) {
          setReviewPath(`/dashboard/reviews/${tconst}`);
          setIsChecking(false);
          return;
        }

        // Se não encontrou resenha autoral, verifica resenha com IA
        const blogAction = await dispatch(fetchBlogPost(tconst));
        if (fetchBlogPost.fulfilled.match(blogAction) && blogAction.payload) {
          setReviewPath(`/dashboard/blogposts/${tconst}`);
          setIsChecking(false);
          return;
        }

        // Se não encontrou nenhuma resenha
        setReviewPath(null);
        setIsChecking(false);
      } catch (error) {
        setReviewPath(null);
        setIsChecking(false);
      }
    };

    checkReview();
  }, [dispatch, tconst, propReviewPath]);

  if (isChecking) {
    return null;
  }

  if (!reviewPath) {
    return null;
  }

  return (
    <Link 
      href={reviewPath} 
      style={{ color: '#3182ce', textDecoration: 'underline' }}
    >
      ver
    </Link>
  );
}

