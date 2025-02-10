import { Box, Button, FormControl, FormLabel, Input, Textarea, useToast } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';

import { clearState, postAuthoralReview } from '../../../lib/features/authoralReview/authoralReviewSlice';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';

const AuthoralReviewForm = () => {
  const dispatch = useAppDispatch();
  const { data, status, error } = useAppSelector((state) => state.authoralReviews);
  const toast = useToast();

  console.log('data', data);
  const [primaryTitle, setPrimaryTitle] = useState('');
  const [contentPt, setContentPt] = useState('');
  const [contentEn, setContentEn] = useState('');
  const [tconst, setTconst] = useState('');
  const [references] = useState<string[]>([]);

  useEffect(() => {
    dispatch(clearState());
    return () => {
      dispatch(clearState());
    };
  }, [dispatch]);

  const validateTconst = (tconst: any) => /^tt\d{7}$/.test(tconst);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateTconst(tconst)) {
      toast({
        title: 'Erro',
        description: "Formato de tconst inválido. Deve começar com 'tt' seguido por 7 dígitos.",
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const reviewData = {
      content: {
        pt: {
          text: contentPt,
        },
        en: {
          text: contentEn,
        },
      },
      tconst,
      primaryTitle,
      references,
      isAiGenerated: false,
    };

    dispatch(postAuthoralReview(reviewData));
  };

  useEffect(() => {
    if (status === 'succeeded') {
      toast({
        title: 'Sucesso',
        description: 'Resenha adicionada com sucesso!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setPrimaryTitle('');
      setContentPt('');
      setContentEn('');
      setTconst('');
      dispatch(clearState());
    }

    if (status === 'failed') {
      const errorMessage =
        error === 'Movie not found in favorites'
          ? 'Filme não encontrado nos favoritos'
          : typeof error === 'string'
            ? error
            : 'tconst não informado';

      toast({
        title: 'Error',
        description: errorMessage,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      dispatch(clearState());
    }
  }, [status, error, toast, dispatch]);

  return (
    <Box as='form' p={4} borderWidth={1} borderRadius='md' boxShadow='md' onSubmit={handleSubmit}>
      <FormControl id='primaryTitle' mb={4} isRequired>
        <FormLabel>Título do Filme</FormLabel>
        <Input
          value={primaryTitle}
          onChange={(e) => setPrimaryTitle(e.target.value)}
          placeholder='Insira o título do filme'
        />
      </FormControl>
      <FormControl id='tconst' mb={4} isRequired>
        <FormLabel>tconst (IMDb)</FormLabel>
        <Input placeholder='Código tt do IMDB' value={tconst} onChange={(e) => setTconst(e.target.value)} />
      </FormControl>
      <FormControl id='contentPt' mb={4} isRequired>
        <FormLabel>Resenha em Português</FormLabel>
        <Textarea
          placeholder='Digite sua resenha em português'
          value={contentPt}
          onChange={(e) => setContentPt(e.target.value)}
          rows={10}
        />
      </FormControl>
      <FormControl id='contentEn' mb={4} isRequired>
        <FormLabel>Resenha em Inglês</FormLabel>
        <Textarea
          placeholder='Digite sua resenha em inglês'
          value={contentEn}
          onChange={(e) => setContentEn(e.target.value)}
          rows={10}
        />
      </FormControl>
      <Button isLoading={status === 'loading'} type='submit'>
        Enviar
      </Button>
    </Box>
  );
};

export default AuthoralReviewForm;
