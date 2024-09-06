import { Box, Text } from '@chakra-ui/react';
import React from 'react';

interface ReviewCardProps {
  primaryTitle: string;
  review: string;
  plot?: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ primaryTitle, review, plot }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="sm"
      p="6"
      mb="4"
      backgroundColor="white"
      _hover={{ boxShadow: 'md' }}
    >
      <Text fontSize="lg" fontWeight="bold" mb="2">
        {primaryTitle}
      </Text>
      <Text fontSize="md" mb="4">
        {review}
      </Text>
      <Text fontSize="sm" color="gray.600">
        {plot}
      </Text>
    </Box>
  );
};

export default ReviewCard;
