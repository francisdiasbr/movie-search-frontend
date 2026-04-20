'use client';

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
      {directorsLoading && <div>Carregando...</div>}
      {directorsError && <div>Error: {directorsError}</div>}
      {!directorsLoading && !directorsError && (
        <>
          <div>
            {directors.map((director, index) => (
              <span
                key={index}
                style={{
                  background: '#fed7d7',
                  borderRadius: '4px',
                  color: '#822727',
                  display: 'inline-block',
                  fontSize: '0.875rem',
                  margin: '0 8px 8px 0',
                  padding: '2px 8px',
                }}
              >
                {director.director}
              </span>
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
