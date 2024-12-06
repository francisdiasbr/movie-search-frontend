'use client';

import { useEffect, useState } from 'react';
import { Text, useToast } from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { getDirectors, postDirector, deleteDirector } from '@/lib/features/directors/directorsSlice';
import FavoriteTag from '../favorites/[tconst]/components/FavoriteTag';


export default function Page() {
  const dispatch = useAppDispatch();
  const { data: directors = [], loading, error } = useAppSelector((state) => state.directors);
  const [selectedDirector, setSelectedDirector] = useState<string | null>(null);
  const [existingDirectors, setExistingDirectors] = useState<string[]>([]);
  const toast = useToast();

  useEffect(() => {
    dispatch(getDirectors()).then((action) => {
      if (getDirectors.fulfilled.match(action)) {
        setExistingDirectors(action.payload.map((director: any) => director.director));
      }
    });
  }, [dispatch]);

  const handleDirectorClick = async (director: string) => {
    if (selectedDirector !== director) {
      setSelectedDirector(director);
      const resultAction = await dispatch(postDirector(director));

      if (postDirector.fulfilled.match(resultAction)) {
        setExistingDirectors(prev => [...prev, director]);
        
        toast({
          title: "Diretor adicionado.",
          description: `O diretor "${director}" foi adicionado com sucesso na lista`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Erro ao adicionar diretor.",
          description: typeof resultAction.payload === 'string' ? resultAction.payload : "Ocorreu um erro ao adicionar o diretor.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const handleDirectorDelete = async (director: string) => {
    try {
      const resultAction = await dispatch(deleteDirector(director));
      if (deleteDirector.fulfilled.match(resultAction)) {
        setExistingDirectors(prev => prev.filter(kw => kw !== director));
        dispatch(getDirectors());
      } else {
        throw new Error("Failed to delete director");
      }
    } catch (error) {
      toast({
        title: "Erro ao deletar diretor.",
        description: "Ocorreu um erro ao tentar deletar o diretor.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Text fontSize='2xl' as='b'>Directors</Text>
      <br/>
      <br/>
      <FavoriteTag 
        keywords={Array.isArray(directors) ? directors.map(kw => kw.director) : []}
        selectedKeyword={selectedDirector} 
        onKeywordClick={handleDirectorClick} 
        onKeywordDelete={handleDirectorDelete}
        existingKeywords={existingDirectors}
      />
    </div>
  );
}
