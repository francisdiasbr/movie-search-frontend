import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';

import {
  clearState,
  postAuthoralReview,
} from '../../../lib/features/authoralReview/authoralReviewSlice';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';

const AuthoralReviewForm = () => {
  const dispatch = useAppDispatch();
  const { data, status, error } = useAppSelector(
    state => state.authoralReviews
  );
  const toast = useToast();

  console.log('data', data);
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [review, setReview] = useState('');
  const [tconst, setTconst] = useState('');

  const validateTconst = (tconst: any) => /^tt\d{7}$/.test(tconst);

  useEffect(() => {
    dispatch(clearState());
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateTconst(tconst)) {
      toast({
        title: 'Error',
        description:
          "Invalid tconst format. It should start with 'tt' followed by 7 digits.",
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    dispatch(
      postAuthoralReview({
        title,
        author,
        review,
        tconst,
      })
    );
  };

  useEffect(() => {
    if (status === 'succeeded') {
      toast({
        title: 'Success',
        description: 'Review added successfully!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setAuthor('');
      setTitle('');
      setReview('');
      setTconst('');
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
    }
  }, [status, error, toast]);

  return (
    <Box
      as='form'
      p={4}
      borderWidth={1}
      borderRadius='md'
      boxShadow='md'
      onSubmit={handleSubmit}
    >
      <FormControl id='author' mb={4} isRequired>
        <FormLabel>Author</FormLabel>
        <Input
          type='text'
          placeholder='Your name here'
          value={author}
          onChange={e => setAuthor(e.target.value)}
        />
      </FormControl>
      <FormControl id='title' mb={4} isRequired>
        <FormLabel>Title</FormLabel>
        <Input
          type='text'
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder='Insert a creative title'
        />
      </FormControl>
      <FormControl id='tconst' mb={4} isRequired>
        <FormLabel>tconst (IMDb)</FormLabel>
        <Input
          type='text'
          placeholder='IMDB tt code'
          value={tconst}
          onChange={e => setTconst(e.target.value)}
        />
      </FormControl>
      <FormControl id='text' mb={4} isRequired>
        <FormLabel>Review</FormLabel>
        <Textarea
          placeholder='Enter text'
          onChange={e => setReview(e.target.value)}
          value={review}
          rows={10}
        />
      </FormControl>
      <Button isLoading={status === 'loading'} type='submit'>
        Submit
      </Button>
    </Box>
  );
};

export default AuthoralReviewForm;
