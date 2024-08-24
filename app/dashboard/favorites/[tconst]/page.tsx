'use client';

import Typography from '@/app/ui/Typography';
import { fetchDetails } from '@/lib/features/movie/movieDetailsSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import arrowLeft from '@iconify/icons-lucide/arrow-left';
import { Icon } from '@iconify/react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

import MovieCardDetails from '../../../ui/MovieCardDetails/index';
import * as S from './styles';

export default function MovieDetailsPage() {
  const dispatch = useAppDispatch();
  const { tconst } = useParams();
  const router = useRouter();
  const { data, status } = useAppSelector((state) => state.moviesDetails);
  

  useEffect(() => {
    if (tconst) {
      dispatch(fetchDetails(tconst));
    }
  }, [dispatch, tconst]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data found.</div>;
  }

  return (
    <S.PageContainer>
      <S.BackButton onClick={() => router.back()}>
        <Icon fontSize={24} icon={arrowLeft} />
      </S.BackButton>
      <MovieCardDetails
        averageRating={data.averageRating}
        numVotes={data.numVotes}
        plot={data.plot}
        primaryTitle={data.primaryTitle}
        quote={data.quote}
        spotifyUrl={data.soundtrack}
        startYear={data.startYear}
        tconst={data.tconst}
        wiki={data.wiki}
      />
      <Typography variant='heading-xl'>Similares</Typography>
    </S.PageContainer>
  );
}
