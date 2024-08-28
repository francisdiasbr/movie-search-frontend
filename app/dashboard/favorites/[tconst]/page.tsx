'use client';

import { fetchDetails } from '@/lib/features/movie/movieDetailsSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import arrowLeft from '@iconify/icons-lucide/arrow-left';
import { Icon } from '@iconify/react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

import PlotCard from '@/app/ui/Cards/PlotCard';
import MovieCardDetails from '../../../ui/Cards/MovieCardDetails/index';
import * as S from './styles';
import MediaCard from '@/app/ui/Cards/MediaCard';
import ImagesCard from '@/app/ui/Cards/ImagesCard';
import HeartIcon from '@/app/ui/HeartIcon';

export default function MovieDetailsPage() {
  const dispatch = useAppDispatch();
  const { tconst } = useParams();
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

  return (
    <S.PageContainer>
      <S.BackButton onClick={() => router.back()}>
        <Icon fontSize={24} icon={arrowLeft} />
      </S.BackButton>
      <HeartIcon />
      <br/>
      <br/>
      <br/>
      <S.CardsGrid>
        <ImagesCard tconst={data.tconst} poster={data.poster}/>
        
        <MediaCard spotifyUrl={data.soundtrack} />
        <PlotCard plot={data.plot} />
        <MovieCardDetails
          primaryTitle={data.primaryTitle}
          quote={data.quote}
          startYear={data.startYear}
          tconst={data.tconst}
          wiki={data.wiki}
        />
        <PlotCard plot={data.plot} />
        <PlotCard plot={data.plot} />
        <PlotCard plot={data.plot} />
      </S.CardsGrid>
    </S.PageContainer>
  );
}
