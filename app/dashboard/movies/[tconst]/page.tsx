'use client';

import { useParams, useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';
import arrowLeft from '@iconify/icons-lucide/arrow-left';
import { useEffect } from 'react';

import MovieCardDetails from '../../../ui/MovieCardDetails/index'
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { fetchDetails } from '@/lib/features/details/detailsSlice';
import * as S from './styles';
import Typography from '@/app/ui/Typography';

export default function MovieDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const dispatch = useAppDispatch();

  const { tconst } = params;

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
      <S.BackButton
        onClick={() => router.back()}
      >
        <Icon icon={arrowLeft} fontSize={24} />
      </S.BackButton>
      <MovieCardDetails
        primaryTitle={data.primaryTitle}
        tconst={data.tconst}
        startYear={data.startYear}
        averageRating={data.averageRating}
        numVotes={data.numVotes}
        plot={data.plot}
        quote={data.quote}
        spotifyUrl={data.soundtrack}
        wiki={data.wiki}
      />
      <Typography variant='heading-xl'>Similares</Typography>
    </S.PageContainer>
  );
}
