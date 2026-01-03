'use client';

import { Text } from '@chakra-ui/react';

import AuthoralReviewForm from '../../ui/AuthoralReviewForm';
import GoBack from '../../ui/GoBack';

const WriteReviewPage = () => {
  return (
    <>
      <GoBack />
      <Text fontSize='2xl' as='b'>
        Write Review
      </Text>
      <p>Write a review for the movie you watched</p>
      <br />
      <AuthoralReviewForm />
    </>
  );
};

export default WriteReviewPage;
