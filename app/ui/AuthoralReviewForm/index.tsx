'use client';

import { Box, Button, FormControl, FormLabel, Input, Textarea, useToast } from '@chakra-ui/react';
import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';

import { clearState, postAuthoralReview } from '../../../lib/features/authoralReview/authoralReviewSlice';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';

const AuthoralReviewForm = () => {
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.authoralReviews);
  const toast = useToast();
  const searchParams = useSearchParams();

  const urlTconst = searchParams.get('tconst') || '';
  const urlPrimaryTitle = searchParams.get('primaryTitle') || '';
  const urlOriginalTitle = searchParams.get('originalTitle') || '';

  
  const [primaryTitle, setPrimaryTitle] = useState(urlPrimaryTitle);
  const [originalTitle, setOriginalTitle] = useState(urlOriginalTitle);
  const [contentPt, setContentPt] = useState('');
  const [contentEn, setContentEn] = useState('');
  const [tconst, setTconst] = useState(urlTconst);

  useEffect(() => {
    setPrimaryTitle(urlPrimaryTitle);
    setOriginalTitle(urlOriginalTitle);
    setTconst(urlTconst);
  }, [urlPrimaryTitle, urlOriginalTitle, urlTconst]);

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

    const formattedContentPt = contentPt.replace(/\n/g, '\n\n').trim();
    const formattedContentEn = contentEn.replace(/\n/g, '\n\n').trim();

    const reviewData = {
      content: {
        pt: { text: formattedContentPt },
        en: { text: formattedContentEn },
      },
      tconst,
      primaryTitle,
      originalTitle,
      isAiGenerated: false,
    };

    console.log('Dados sendo enviados:', reviewData);
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
      console.log('Erro completo:', error);

      const errorMessage = (() => {
        if (error === 'Movie not found in favorites') {
          return 'Filme não encontrado nos favoritos';
        }
        if (!tconst) {
          return 'tconst não informado';
        }
        if (typeof error === 'string') {
          return error;
        }
        return 'Erro ao salvar a resenha';
      })();

      toast({
        title: 'Erro',
        description: errorMessage,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      dispatch(clearState());
    }
  }, [status, error, toast, dispatch, tconst]);

  return (
    <Box as='form' p={4} borderWidth={1} borderRadius='md' onSubmit={handleSubmit}>
      <FormControl id='primaryTitle' mb={4} isRequired>
        <FormLabel>Título do Filme</FormLabel>
        <Input
          value={primaryTitle}
          onChange={(e) => setPrimaryTitle(e.target.value)}
          placeholder='Insira o título do filme'
          isDisabled={!!urlPrimaryTitle}
        />
      </FormControl>
      <FormControl id='originalTitle' mb={4}>
        <FormLabel>Título Original</FormLabel>
        <Input
          value={originalTitle}
          onChange={(e) => setOriginalTitle(e.target.value)}
          placeholder='Título original do filme'
          isDisabled={true}
        />
      </FormControl>
      <FormControl id='tconst' mb={4} isRequired>
        <FormLabel>tconst (IMDb)</FormLabel>
        <Input 
          placeholder='Código tt do IMDB' 
          value={tconst} 
          onChange={(e) => setTconst(e.target.value)}
          isDisabled={!!urlTconst}
        />
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
