'use client';

import { Button, Input, Text, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import {
  generateReview,
  clearGenerateReviewState,
} from '../../../lib/features/review/reviewsSlice';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import * as S from './styles';

const ReviewPage = () => {
  const dispatch = useAppDispatch();
  const { data, error, status } = useAppSelector(state => state.moviesReviews);
  const toast = useToast();

  const [tconst, setTconst] = useState('');

  const validateTconst = (tconst: any) => /^tt\d{7}$/.test(tconst);

  useEffect(() => {
    dispatch(clearGenerateReviewState());
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTconst(e.target.value);
  };

  const handleGenerate = () => {
    dispatch(generateReview(tconst));
  };

  useEffect(() => {
    if (status === 'succeeded') {
      toast({
        title: 'Success',
        description: 'Review generated',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setTconst('');
    }

    if (status === 'failed') {
      const errorMessage =
        error === 'Movie not found in favorites'
          ? 'Filme não encontrado nos favoritos'
          : typeof error === 'string'
            ? error
            : 'Falha ao adicionar a review';
      toast({
        title: 'Error',
        description: 'Failed to generate review',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [status, error, toast]);

  return (
    <S.PageContainer>
      <Text fontSize='2xl' as='b'>
        Generate a Review
      </Text>
      <p>Generate a review and a plot for a movie you chose</p>
      <Input onChange={handleChange} placeholder='tconst' value={tconst} />
      <br />
      <Button onClick={handleGenerate} isLoading={status === 'loading'}>
        Generate
      </Button>
      {status === 'failed' && <p>Failed to generate review</p>}
      {status === 'succeeded' && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Text fontSize='2xl'>{data?.title}</Text>
          <Text fontSize='1xl'>Plot:</Text>
          <Text>{data?.plot}</Text>
          <Text fontSize='1xl'>Review:</Text>
          <Text>{data?.review}</Text>
        </div>
      )}
    </S.PageContainer>
  );
};

export default ReviewPage;
