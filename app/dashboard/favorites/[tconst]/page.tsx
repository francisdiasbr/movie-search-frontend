'use client';

import { Box, Tag, Text, Wrap, WrapItem, useToast } from '@chakra-ui/react';
import arrowLeft from '@iconify/icons-lucide/arrow-left';
import { Icon } from '@iconify/react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';

import { postKeyword, getKeywords, deleteKeyword } from '@/lib/features/keywords/keywordsSlice';
import { fetchDetails } from '@/lib/features/movie/movieDetailsSlice';
import * as S from './styles';
import MediaCard from '@/app/ui/Cards/MediaCard';
import FavoriteTag from './components/FavoriteTag';

export default function MovieDetailsPage() {

  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);
  const [existingKeywords, setExistingKeywords] = useState<string[]>([]);

  const dispatch = useAppDispatch();
  const { tconst } = useParams() as { tconst: string };

  const { data, fetchStatus } = useAppSelector((state) => state.moviesDetails);
  
  const router = useRouter();
  
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
  }

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
        setExistingKeywords(prev => [...prev, keyword]);
        
        toast({
          title: "Palavra-chave adicionada.",
          description: `A palavra-chave "${keyword}" foi adicionada com sucesso na lista`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Erro ao adicionar palavra-chave.",
          description: typeof resultAction.payload === 'string' ? resultAction.payload : "Ocorreu um erro ao adicionar a palavra-chave.",
          status: "error",
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
      <FavoriteTag 
        keywords={plotKeywords} 
        selectedKeyword={selectedKeyword} 
        onKeywordClick={handleKeywordClick} 
        onKeywordDelete={handleKeywordDelete}
        existingKeywords={existingKeywords}
      />
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
        <Text>
          {formatQuote(data.quote)}
        </Text>
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
