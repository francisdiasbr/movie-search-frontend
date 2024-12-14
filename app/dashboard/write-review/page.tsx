'use client';

import { Text } from '@chakra-ui/react';

import AuthoralReviewForm from '../../ui/AuthoralReviewForm';

const WriteReviewPage = () => {
  return (
    <>
      <Text fontSize='2xl' as='b'>
        Write Review
      </Text>
      <p>Write a review for the movie you watched</p>
      <AuthoralReviewForm />
    </>
  );
};

export default WriteReviewPage;
