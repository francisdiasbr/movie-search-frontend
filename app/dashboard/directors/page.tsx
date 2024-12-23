'use client';

import { Tag } from '@chakra-ui/react';
import { useEffect } from 'react';

import { getDirectors } from '../../../lib/features/directors/directorsSlice';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';

export default function Page() {
  const dispatch = useAppDispatch();
  const { data: directors = [], loading: directorsLoading, error: directorsError } = useAppSelector(state => state.directors);

  useEffect(() => {
    dispatch(getDirectors());
  }, [dispatch]);

  return (
    <div>
      <h2>Directors</h2>
      <br />
      <br />
      {directorsLoading && <div>Carregando...</div>}
      {directorsError && <div>Error: {directorsError}</div>}
      {!directorsLoading && !directorsError && (
        <>
          <div>
            {directors.map((director, index) => (
              <Tag key={index} colorScheme='red' mr={2} mb={2}>
                {director.director}
              </Tag>
            ))}
          </div>
          <div style={{ marginTop: '10px' }}>
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
          </div>
        </>
      )}
    </div>
  );
}
