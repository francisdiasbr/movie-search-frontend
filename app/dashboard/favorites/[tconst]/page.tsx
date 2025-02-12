'use client';

import { Tag, Text, useToast } from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import MediaCard from '../../../../app/ui/Cards/MediaCard';
import { postDirector } from '../../../../lib/features/directors/directorsSlice';
import { postKeyword, getKeywords, deleteKeyword } from '../../../../lib/features/keywords/keywordsSlice';
import { fetchDetails } from '../../../../lib/features/movie/movieDetailsSlice';
import { useAppDispatch, useAppSelector } from '../../../../lib/hooks';
import GoBack from '../../../ui/GoBack';
import * as S from './styles';
import { getSections } from './sections';

export default function MovieDetailsPage() {
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);
  const [existingKeywords, setExistingKeywords] = useState<string[]>([]);

  const dispatch = useAppDispatch();
  const { tconst } = useParams() as { tconst: string };

  const { data, fetchStatus } = useAppSelector((state) => state.moviesDetails);

  console.log('data', data);
  const toast = useToast();

  useEffect(() => {
    if (tconst) {
      dispatch(fetchDetails(tconst));
    }
    dispatch(getKeywords()).then((action) => {
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
    setSelectedKeyword((prevKeyword) => (prevKeyword === keyword ? null : keyword));

    if (selectedKeyword !== keyword) {
      const resultAction = await dispatch(postKeyword(keyword));

      if (postKeyword.fulfilled.match(resultAction)) {
        setExistingKeywords((prev) => [...prev, keyword]);

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
          description:
            typeof resultAction.payload === 'string'
              ? resultAction.payload
              : 'Ocorreu um erro ao adicionar a palavra-chave.',
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
      setExistingKeywords((prev) => prev.filter((kw) => kw !== keyword));
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
        description:
          typeof resultAction.payload === 'string' ? resultAction.payload : 'Ocorreu um erro ao adicionar o diretor.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handlers = {
    handleDirectorClick,
    handleKeywordClick,
    handleKeywordDelete,
    sanitizeTrivia,
    formatQuote,
  };

  const sections = getSections({
    data,
    handlers,
    existingKeywords,
    plotKeywords,
  });

  return (
    <S.PageContainer>
      <GoBack centerText={data.originalTitle} />
      {sections.map((section: { title: string; content: string }, index: number) => (
        <S.SectionContainer key={index}>
          <S.SectionTitle>{section.title}:</S.SectionTitle>
          <S.SectionContent>{section.content}</S.SectionContent>
        </S.SectionContainer>
      ))}
      <MediaCard spotifyUrl={data.soundtrack} />
    </S.PageContainer>
  );
}
