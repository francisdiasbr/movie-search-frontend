'use client';

import { Box, Tag, Text, Wrap, WrapItem } from '@chakra-ui/react';
import arrowLeft from '@iconify/icons-lucide/arrow-left';
import { Icon } from '@iconify/react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';

import { fetchDetails } from '@/lib/features/movie/movieDetailsSlice';
import * as S from './styles';
import MediaCard from '@/app/ui/Cards/MediaCard';

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
        <li key={index} style={{ marginLeft: '20px', paddingBottom: '10px' }}>
          {item}
        </li>
      );
    });
  }

  const plotKeywords = Array.isArray(data.plot_keywords) ? data.plot_keywords : [];

  return (
    <S.PageContainer>
      <S.BackButton onClick={() => router.back()}>
        <Icon fontSize={24} icon={arrowLeft} />
      </S.BackButton>
      <Box mb={4}>
        <Text fontWeight='bold'>Watched:</Text>
        <Tag colorScheme={data.watched ? 'green' : 'red'}>{data.watched ? 'Já vi' : 'Não vi'}</Tag>
      </Box>
      <Box mb={4}>
        <Text fontWeight='bold'>Original title:</Text>
        <Text>{data.originalTitle}</Text>
      </Box>
      <Box mb={4}>
        <Text fontWeight='bold'>Primary title:</Text>
        <Text>{data.primaryTitle}</Text>
      </Box>
      <Box mb={4}>
        <Text fontWeight='bold'>Director:</Text>
        <Text>{data.director}</Text>
      </Box>
      <Box mb={4}>
        <Text fontWeight='bold'>Country:</Text>
        <Text>{data.country}</Text>
      </Box>
      <Box mb={4}>
        <Text fontWeight='bold'>Year:</Text>
        <Text>{data.startYear}</Text>
      </Box>
      <Box mb={4}>
        <Text fontWeight='bold'>Plot:</Text>
        <Text>{data.plot}</Text>
      </Box>
      <Text fontWeight='bold'>Plot keywords:</Text>
      <Wrap spacing={2}>
        {plotKeywords.map((keyword: string, index: number) => (
          <WrapItem key={index}>
            <Tag size="md" variant="solid" bg="primary.100" borderRadius='full'>
              {keyword}
            </Tag>
          </WrapItem>
        ))}
      </Wrap>
      <Box mb={4} mt={4}>
        <Text fontWeight='bold'>Wiki:</Text>
        <Text>
          <a href={data.wiki} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: 'blue' }}>
            {data.wiki}
          </a>
        </Text>
      </Box>
      <Box mb={4}>
        <Text fontWeight='bold'>Trivia:</Text>
        <Text>
        <ul>
          {sanitizeTrivia(data.trivia)}
        </ul>
      </Text>
      </Box>
      <Box mb={4}>
        <Text fontWeight='bold'>Quote:</Text>
        <Text>{data.quote}</Text>
      </Box>
      <Box mb={4}>
        <Text fontWeight='bold'>Magnet Link:</Text>
        <Text style={{ wordBreak: 'break-all' }}>{data.magnet_link}</Text>
      </Box>
      <br />
      <MediaCard spotifyUrl={data.soundtrack} />
    </S.PageContainer>
  );
}
