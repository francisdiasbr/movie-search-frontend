'use client';

import { Box, Tag, Text } from '@chakra-ui/react';
import { useEffect } from 'react';

import { getDirectors } from '../../../lib/features/directors/directorsSlice';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';

export default function Page() {
  const dispatch = useAppDispatch();
  const {
    data: directors = [],
    loading: directorsLoading,
    error: directorsError,
  } = useAppSelector(state => state.directors);

  useEffect(() => {
    dispatch(getDirectors());
  }, [dispatch]);

  if (directorsLoading) {
    return <div>Loading directors...</div>;
  }

  if (directorsError) {
    return <div>Error: {directorsError}</div>;
  }

  return (
    <div>
      <Text fontSize='2xl' as='b'>
        Directors
      </Text>
      <br />
      <br />
      <Box>
        {directors.map((director, index) => (
          <Tag key={index} colorScheme='red' mr={2} mb={2}>
            {director.director}
          </Tag>
        ))}
      </Box>
      <Box mt={4}>
        {directors.map((director, index) => (
          <div key={index}>
            {Array.isArray(director.filmography) &&
              director.filmography.map((movie, index) => (
                <div key={index}>
                  {movie.originalTitle} - {movie.year}
                </div>
              ))}
          </div>
        ))}
      </Box>
    </div>
  );
}
