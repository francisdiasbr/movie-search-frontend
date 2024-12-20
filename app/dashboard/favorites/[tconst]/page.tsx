'use client';

import { Box, Tag, Text, useToast } from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import MediaCard from '../../../../app/ui/Cards/MediaCard';
import { postDirector } from '../../../../lib/features/directors/directorsSlice';
import { postKeyword, getKeywords, deleteKeyword } from '../../../../lib/features/keywords/keywordsSlice';
import { fetchDetails } from '../../../../lib/features/movie/movieDetailsSlice';
import { useAppDispatch, useAppSelector } from '../../../../lib/hooks';
import GoBack from '../../../ui/GoBack';
import FavoriteTag from './components/FavoriteTag';
import * as S from './styles';

export default function MovieDetailsPage() {
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);
  const [existingKeywords, setExistingKeywords] = useState<string[]>([]);

  const dispatch = useAppDispatch();
  const { tconst } = useParams() as { tconst: string };

  const { data, fetchStatus } = useAppSelector(state => state.moviesDetails);

  console.log('data', data);
  const toast = useToast();

  useEffect(() => {
    if (tconst) {
      dispatch(fetchDetails(tconst));
    }
    dispatch(getKeywords()).then(action => {
      if (getKeywords.fulfilled.match(action)) {
        setExistingKeywords(action.payload.map((kw: any) => kw.keyword));
      }
    });
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
  };

  const plotKeywords = Array.isArray(data.plot_keywords) ? data.plot_keywords : [];

  const formatQuote = (quote: string) => {
    return quote.split(/(?<=\.\s)|(?<=:\s)/).map((line, index) => {
      return (
        <Text key={index} style={{ marginBottom: '5px' }}>
          {line.trim()}
        </Text>
      );
    });
  };

  const handleKeywordClick = async (keyword: string) => {
    setSelectedKeyword(prevKeyword => (prevKeyword === keyword ? null : keyword));

    if (selectedKeyword !== keyword) {
      const resultAction = await dispatch(postKeyword(keyword));

      if (postKeyword.fulfilled.match(resultAction)) {
        setExistingKeywords(prev => [...prev, keyword]);

        toast({
          title: 'Palavra-chave adicionada.',
          description: `A palavra-chave "${keyword}" foi adicionada com sucesso na lista`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Erro ao adicionar palavra-chave.',
          description: typeof resultAction.payload === 'string' ? resultAction.payload : 'Ocorreu um erro ao adicionar a palavra-chave.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const handleKeywordDelete = async (keyword: string) => {
    const resultAction = await dispatch(deleteKeyword(keyword));
    if (deleteKeyword.fulfilled.match(resultAction)) {
      setExistingKeywords(prev => prev.filter(kw => kw !== keyword));
    }
  };

  const handleDirectorClick = async (director: string) => {
    const resultAction = await dispatch(postDirector(director));

    if (postDirector.fulfilled.match(resultAction)) {
      toast({
        title: 'Diretor adicionado.',
        description: `O diretor "${director}" foi adicionado com sucesso na lista`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Erro ao adicionar diretor.',
        description: typeof resultAction.payload === 'string' ? resultAction.payload : 'Ocorreu um erro ao adicionar o diretor.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <S.PageContainer>
      <GoBack centerText={data.originalTitle} />
      <div style={{ marginBottom: '10px' }}>
        <h3>Original title:</h3>
        <p>{data.originalTitle}</p>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <h3>Primary title:</h3>
        <p>{data.primaryTitle}</p>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <h3>Watched:</h3>
        <Tag colorScheme={data.watched ? 'green' : 'red'}>{data.watched ? 'Já vi' : 'Não vi'}</Tag>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <h3>Director:</h3>
        <button
          onClick={() => handleDirectorClick(data.director)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleDirectorClick(data.director);
            }
          }}
          style={{
            cursor: 'pointer',
            textDecoration: 'underline',
            color: 'blue',
            background: 'none',
            border: 'none',
            padding: 0,
            font: 'inherit',
          }}
        >
          {data.director}
        </button>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <h3>Writers:</h3>
        <p>{data.writers && data.writers.length > 0 ? data.writers.join(', ') : 'N/A'}</p>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <h3>Stars:</h3>
        <p>{data.stars.join(', ')}</p>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <h3>Country:</h3>
        <p>{data.country}</p>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <h3>Year:</h3>
        <p>{data.startYear}</p>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <Text fontWeight='bold'>Plot:</Text>
        <p>{data.plot}</p>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <h3>Genres:</h3>
        <p>{data.genres.join(', ')}</p>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <h3>Plot keywords:</h3>
        <FavoriteTag
          keywords={plotKeywords}
          selectedKeyword={selectedKeyword}
          onKeywordClick={handleKeywordClick}
          onKeywordDelete={handleKeywordDelete}
          existingKeywords={existingKeywords}
      />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <h3>Wiki:</h3>
        <p>
          <a href={data.wiki} target='_blank' rel='noopener noreferrer' style={{ textDecoration: 'underline', color: 'blue' }}>
            {data.wiki}
          </a>
        </p>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <h3>Trivia:</h3>
        <p>
          <ul>{sanitizeTrivia(data.trivia)}</ul>
        </p>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <h3>Quote:</h3>
        <p>{formatQuote(data.quote)}</p>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <h3>Magnet Link:</h3>
        <p style={{ wordBreak: 'break-all' }}>
          <a
            href={encodeURI(data.magnet_link)}
            onClick={e => {
              e.preventDefault();
              window.location.href = data.magnet_link;
            }}
            style={{ color: 'blue', textDecoration: 'underline' }}
          >
            {data.magnet_link}
          </a>
        </p>
      </div>
      <br />
      <MediaCard spotifyUrl={data.soundtrack} />
    </S.PageContainer>
  );
}
