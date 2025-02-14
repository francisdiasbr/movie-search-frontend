'use client';

import { useDisclosure, Text, useToast, IconButton, HStack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Switch, Input } from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

import MediaCard from '../../../../app/ui/Cards/MediaCard';
import { postDirector } from '../../../../lib/features/directors/directorsSlice';
import { postKeyword, getKeywords, deleteKeyword } from '../../../../lib/features/keywords/keywordsSlice';
import { fetchDetails, editDetails, deleteFavorite, resetState } from '../../../../lib/features/movie/movieDetailsSlice';
import { useAppDispatch, useAppSelector } from '../../../../lib/hooks';
import GoBack from '../../../ui/GoBack';
import * as S from './styles';
import { getSections } from './sections';

export default function MovieDetailsPage() {
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);
  const [existingKeywords, setExistingKeywords] = useState<string[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useAppDispatch();
  const { tconst } = useParams() as { tconst: string };
  const router = useRouter();

  const { data, fetchStatus } = useAppSelector((state) => state.moviesDetails);
  const toast = useToast();

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

  const handleDelete = async (tconst: string) => {
    dispatch(deleteFavorite(tconst)).then((resultAction) => {
      if (deleteFavorite.fulfilled.match(resultAction)) {
        toast({
          title: 'Sucesso',
          description: 'Filme removido dos favoritos.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        router.push('/dashboard/favorites');
      } else {
        toast({
          title: 'Erro',
          description: 'Não foi possível remover o filme dos favoritos.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    });
  };

  const handleUpdate = async () => {
    if (!data) return;

    const updateData = {
      tconst: data.tconst,
      originalTitle: data.originalTitle,
      soundtrack: data.soundtrack || '',
      wiki: data.wiki || '',
      watched: !data.watched,
    };

    dispatch(editDetails(updateData)).then((resultAction) => {
      if (editDetails.fulfilled.match(resultAction)) {
        toast({
          title: 'Sucesso',
          description: 'Filme atualizado com sucesso.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        onClose();
        dispatch(fetchDetails(tconst));
      } else {
        toast({
          title: 'Erro',
          description: 'Não foi possível atualizar o filme.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    });
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
      <HStack spacing={2} mb={4} justifyContent="flex-end">
        <IconButton
          aria-label="Editar favorito"
          icon={<FaEdit />}
          onClick={onOpen}
        />
        <IconButton
          aria-label="Remover dos favoritos"
          icon={<FaTrash />}
          onClick={() => handleDelete(tconst)}
          colorScheme="red"
        />
      </HStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Favorito</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>IMDB ID (tconst)</FormLabel>
              <Input 
                isReadOnly 
                value={data?.tconst} 
                bg='gray.100' 
                cursor='not-allowed' 
                _hover={{ bg: 'gray.100' }} 
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Título Original</FormLabel>
              <Input 
                isReadOnly 
                value={data?.originalTitle} 
                bg='gray.100' 
                cursor='not-allowed' 
                _hover={{ bg: 'gray.100' }} 
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Trilha Sonora (Spotify URL)</FormLabel>
              <Input 
                value={data?.soundtrack || ''} 
                onChange={(e) => dispatch(editDetails({ ...data, soundtrack: e.target.value }))}
                placeholder="URL da trilha sonora no Spotify"
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Wiki</FormLabel>
              <Input 
                value={data?.wiki || ''} 
                onChange={(e) => dispatch(editDetails({ ...data, wiki: e.target.value }))}
                placeholder="URL da página Wiki"
              />
            </FormControl>

            <FormControl display='flex' alignItems='center' mb={4}>
              <FormLabel htmlFor='watched' mb='0'>
                Já assistiu?
              </FormLabel>
              <Switch
                id='watched'
                isChecked={data?.watched || false}
                onChange={() => dispatch(editDetails({ ...data, watched: !data?.watched }))}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleUpdate}>
              Salvar
            </Button>
            <Button variant='ghost' onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

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
