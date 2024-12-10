'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Box, Heading, Text, VStack, Divider, Skeleton } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { getBlogPosts } from '@/lib/features/blogPosts/blogPostsSlice';
import GoBack from '@/app/ui/GoBack';

export default function BlogPostPage() {
  const { tconst } = useParams() as { tconst: string };
  const dispatch = useAppDispatch();
  const { data, status, error } = useAppSelector((state) => state.blogPosts);

  console.log('data blogposts [tconst]', data);
  useEffect(() => {
    if (tconst) {
      console.log('tconst', tconst);
      dispatch(getBlogPosts(tconst));
    }
  }, [dispatch, tconst]);

  if (status === 'loading') {
    return (
      <Box p={6} maxW="1200px" mx="auto">
        <GoBack />
        <VStack spacing={6} align="stretch">
          <Skeleton height="40px" />
          <Skeleton height="100px" />
          <Divider />
          <Skeleton height="100px" />
          <Divider />
          <Skeleton height="100px" />
          <Divider />
          <Skeleton height="100px" />
          <Divider />
          <Skeleton height="100px" />
        </VStack>
      </Box>
    );
  }

  if (status === 'failed') {
    return (
      <Box p={6}>
        <GoBack />
        <Text color="red.500">
          Erro ao carregar o post do blog: {error || 'Erro desconhecido'}
        </Text>
      </Box>
    );
  }

  if (!data?.primaryTitle) {
    return (
      <Box p={6}>
        <GoBack />
        <Text>Nenhum post de blog encontrado para este filme.</Text>
      </Box>
    );
  }

  const sections = [
    { title: 'Introdução', content: data.introduction },
    { title: 'Astros e Personagens', content: data.stars_and_characters },
    { title: 'Contexto Histórico', content: data.historical_context },
    { title: 'Importância Cultural', content: data.cultural_importance },
    { title: 'Análise Técnica', content: data.technical_analysis },
    { title: 'Conclusão', content: data.conclusion },
    { title: 'Original Soundtrack', content: data.original_movie_soundtrack },
  ];

  return (
    <Box p={6} maxW="1200px" mx="auto">
      <GoBack centerText={data.primaryTitle} />
      
      <VStack spacing={6} align="stretch">
        <Heading as="h1" size="xl" mb={4}>
          {data.title}
        </Heading>

        {data.poster_url && (
          <Box mb={4} display="flex" justifyContent="center">
            <img 
              src={data.poster_url} 
              alt={`Poster de ${data.title}`} 
              style={{ 
                maxWidth: '400px',
                height: 'auto',
                objectFit: 'contain'
              }} 
            />
          </Box>
        )}

        {sections.map((section, index) => (
          <Box key={index}>
            <Text fontSize="lg" fontWeight="bold" mb={2}>
              {section.title}
            </Text>
            <Text mb={4}>{section.content}</Text>
            {index < sections.length - 1 && <Divider />}
          </Box>
        ))}
      </VStack>
    </Box>
  );
} 