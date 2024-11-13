'use client';

import arrowLeft from '@iconify/icons-lucide/arrow-left';
import { Icon } from '@iconify/react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';

import { fetchDetails } from '@/lib/features/movie/movieDetailsSlice';
import TriviaCard from '@/app/ui/Cards/TriviaCard';
import MovieCardDetails from '../../../ui/Cards/MovieCardDetails/index';
import * as S from './styles';
import MediaCard from '@/app/ui/Cards/MediaCard';
import { Text } from '@chakra-ui/react';

export default function MovieDetailsPage() {
  const dispatch = useAppDispatch();
  const { tconst } = useParams() as { tconst: string };
  const router = useRouter();
  const { data, fetchStatus } = useAppSelector((state) => state.moviesDetails);

  useEffect(() => {
    if (tconst) {
      dispatch(fetchDetails(tconst));
    }
  }, [dispatch, tconst]);

  if (fetchStatus === 'loading') {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data found.</div>;
  }

  const sanitizeTrivia = (trivia: string) => {
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
        <TriviaCard trivia={sanitizeTrivia(data.trivia)} />
      </S.CardsGrid>
      <MediaCard spotifyUrl={data.soundtrack} />
    </S.PageContainer>
  );
}
