'use client';

import { Box, Text, SimpleGrid, Card, CardBody, Heading, Button } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useEffect } from 'react';
import { fetchFavorites } from '@/lib/features/movies/movieFavoritesSlice';

export default function BlogPostsPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { entries, status } = useAppSelector((state) => state.moviesFavorites);

  useEffect(() => {
    dispatch(fetchFavorites({ page: 1 }));
  }, [dispatch]);

  const handleViewBlogPost = (tconst: string) => {
    router.push(`/dashboard/blogposts/${tconst}`);
  };

  if (status === 'loading') {
    return (
      <Box p={4}>
        <Text fontSize='2xl' as='b' mb={6}>Blog Posts</Text>
        <Text>Carregando...</Text>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Text fontSize='2xl' as='b' mb={6}>Blog Posts</Text>
      
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mt={6}>
        {entries.map((movie: any) => (
          <Card key={movie.tconst} variant="outline">
            <CardBody>
              <Heading size="md" mb={4}>{movie.originalTitle}</Heading>
              <Text mb={4} color="gray.600">
                {movie.director} ({movie.startYear})
              </Text>
              <Button 
                colorScheme="blue" 
                onClick={() => handleViewBlogPost(movie.tconst)}
              >
                Ver Blog Post
              </Button>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
}
