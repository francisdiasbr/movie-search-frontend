'use client';

import { useDisclosure, Text, useToast, IconButton, HStack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Switch, Input } from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaEdit, FaBook, FaPen, FaRobot } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

import MediaCard from '../../../../app/ui/Cards/MediaCard';
import { postDirector } from '../../../../lib/features/directors/directorsSlice';
import { postKeyword, getKeywords, deleteKeyword } from '../../../../lib/features/keywords/keywordsSlice';
import { fetchDetails, editDetails, deleteFavorite, resetState } from '../../../../lib/features/movie/movieDetailsSlice';
import { useAppDispatch, useAppSelector } from '../../../../lib/hooks';
import GoBack from '../../../ui/GoBack';
import * as S from './styles';
import { getSections } from './sections';
import EditModal from './edit/editModal';
import { fetchBlogPost, createBlogPost } from '../../../../lib/features/blogPosts/blogPostsSlice';
import { fetchAuthoralReview } from '../../../../lib/features/authoralReview/authoralReviewSlice';

export default function MovieDetailsPage() {
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);
  const [existingKeywords, setExistingKeywords] = useState<string[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isGeneratingBlogPost, setIsGeneratingBlogPost] = useState(false);

  const dispatch = useAppDispatch();
  const { tconst } = useParams() as { tconst: string };
  const router = useRouter();

  const { data, fetchStatus } = useAppSelector((state) => state.moviesDetails);
  const toast = useToast();
  const { status } = useAppSelector((state) => state.blogPosts);

  useEffect(() => {
    if (tconst) {
      dispatch(resetState());
      dispatch(fetchDetails(tconst));
    }
    if (existingKeywords.length === 0) {
      dispatch(getKeywords()).then((action) => {
        if (getKeywords.fulfilled.match(action)) {
          setExistingKeywords(action.payload.map((kw: any) => kw.keyword));
        }
      });
    }
  }, [dispatch, tconst]);

  useEffect(() => {
    return () => {
      dispatch(resetState());
      setSelectedKeyword(null);
      setExistingKeywords([]);
    };
  }, [dispatch]);

  if (fetchStatus === 'loading') {
    return <div>Carregando...</div>;
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

  const checkReviewType = async (tconst: string) => {
    try {
      // Verifica se existe uma resenha autoral
      const authoralAction = await dispatch(fetchAuthoralReview(tconst));
      if (fetchAuthoralReview.fulfilled.match(authoralAction) && authoralAction.payload) {
        router.push(`/dashboard/reviews/${tconst}`);
        return;
      }

      const blogAction = await dispatch(fetchBlogPost(tconst));
      if (fetchBlogPost.fulfilled.match(blogAction) && blogAction.payload) {
        router.push(`/dashboard/blogposts/${tconst}`);
        return;
      }

      toast({
        title: 'Nenhuma resenha encontrada',
        description: 'Não foi encontrada nenhuma resenha para este filme.',
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao buscar resenha.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleCreateBlogPost = async () => {
    try {
      // Verifica se existe uma resenha autoral
      const authoralAction = await dispatch(fetchAuthoralReview(tconst));
      if (fetchAuthoralReview.fulfilled.match(authoralAction) && authoralAction.payload) {
        toast({
          title: 'Resenha existente',
          description: 'Já existe uma resenha autoral para este filme.',
          status: 'warning',
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      setIsGeneratingBlogPost(true);
      const resultAction = await dispatch(createBlogPost(tconst));
      
      if (createBlogPost.fulfilled.match(resultAction)) {
        toast({
          title: 'Sucesso',
          description: 'Resenha gerada com sucesso.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        router.push(`/dashboard/blogposts/${tconst}`);
      } else {
        toast({
          title: 'Erro',
          description: 'Já existe uma resenha com IA para este filme.',
          status: 'warning',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Já existe uma resenha com IA para este filme.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsGeneratingBlogPost(false);
    }
  };

  const handleCreateAuthoralReview = async () => {
    try {
      // Verifica se existe uma resenha autoral
      const authoralAction = await dispatch(fetchAuthoralReview(tconst));
      if (fetchAuthoralReview.fulfilled.match(authoralAction) && authoralAction.payload) {
        toast({
          title: 'Resenha existente',
          description: 'Já existe uma resenha autoral para este filme.',
          status: 'warning',
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      // Verifica se existe uma resenha com IA
      const blogAction = await dispatch(fetchBlogPost(tconst));
      if (fetchBlogPost.fulfilled.match(blogAction) && blogAction.payload) {
        toast({
          title: 'Resenha existente',
          description: 'Já existe uma resenha com IA para este filme.',
          status: 'warning',
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      router.push(`/dashboard/write-review?tconst=${tconst}&primaryTitle=${data.primaryTitle}&originalTitle=${data.originalTitle}`);
    } catch (error) {
      router.push(`/dashboard/write-review?tconst=${tconst}&primaryTitle=${data.primaryTitle}&originalTitle=${data.originalTitle}`);
    }
  };

  const handlers = {
    handleDirectorClick,
    handleKeywordClick,
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
      <HStack spacing={2} mb={4} justifyContent="flex-end">
        {data.watched && (
          <>
            <Button
              leftIcon={<FaBook />}
              colorScheme="teal"
              onClick={() => checkReviewType(tconst)}
              size="sm"
            >
              Ver resenha
            </Button>
            <Button
              leftIcon={<FaRobot />}
              colorScheme="purple"
              onClick={handleCreateBlogPost}
              size="sm"
              isLoading={isGeneratingBlogPost}
            >
              Resenha com IA
            </Button>
            <Button
              leftIcon={<FaPen />}
              colorScheme="blue"
              onClick={handleCreateAuthoralReview}
              size="sm"
            >
              Resenha autoral
            </Button>
          </>
        )}
        <IconButton
          aria-label="Editar favorito"
          icon={<FaEdit />}
          onClick={onOpen}
        />
      </HStack>

      <EditModal 
        isOpen={isOpen} 
        onClose={onClose} 
        data={data} 
        tconst={tconst}
      />

      {sections.map((section, index) => (
        <S.SectionContainer key={index}>
          <S.SectionTitle>{section.title}</S.SectionTitle>
          <S.SectionContent>
            {typeof section.content === 'object' 
              ? section.content 
              : String(section.content)}
          </S.SectionContent>
        </S.SectionContainer>
      ))}
      <MediaCard spotifyUrl={data.soundtrack} />
    </S.PageContainer>
  );
}
