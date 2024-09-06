'use client';

import { fetchDetails } from '@/lib/features/movie/movieDetailsSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import arrowLeft from '@iconify/icons-lucide/arrow-left';
import { Icon } from '@iconify/react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

import PlotCard from '@/app/ui/Cards/PlotCard';
import TriviaCard from '@/app/ui/Cards/TriviaCard';
import MovieCardDetails from '../../../ui/Cards/MovieCardDetails/index';
import * as S from './styles';
import MediaCard from '@/app/ui/Cards/MediaCard';
import { fetchReview } from '@/lib/features/review/reviewsSlice';
import { Text } from '@chakra-ui/react';

export default function MovieDetailsPage() {
  const dispatch = useAppDispatch();
  const { tconst } = useParams();
  const router = useRouter();
  const { data, fetchStatus } = useAppSelector((state) => state.moviesDetails);
  const { data: reviewsData } = useAppSelector((state) => state.moviesReviews);


  useEffect(() => {
    if (tconst) {
      dispatch(fetchDetails(tconst));
      dispatch(fetchReview(tconst));
    }
  }, [dispatch, tconst]);

  if (fetchStatus === 'loading') {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data found.</div>;
  }

  const sanitizeTrivia = (trivia: string) => {
    console.log('trivia', trivia);
    return trivia.split('\n\n').map((item, index) => {
      return (
        <>
          <li key={index}>{item}</li>
          <br />
        </>
      );
    });
  }

  return (
    <S.PageContainer>
      <S.BackButton onClick={() => router.back()}>
        <Icon fontSize={24} icon={arrowLeft} />
      </S.BackButton>
      <Text fontSize='2xl'>{data.primaryTitle}</Text>
      <Text fontSize='1xl'>{data.country}</Text>
      <Text fontSize='1xl'>{data.startYear}</Text>
      <Text fontSize='1xl'>{data.tconst}</Text>
      <br />
      <S.CardsGrid>
        <MovieCardDetails
          quote={data.quote}
          wiki={data.wiki}
        />
        <PlotCard review={reviewsData?.review} />
        <TriviaCard trivia={sanitizeTrivia(data.trivia)} />
      </S.CardsGrid>
      <MediaCard spotifyUrl={data.soundtrack} />
    </S.PageContainer>
  );
}
