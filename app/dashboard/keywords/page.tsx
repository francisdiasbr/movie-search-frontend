'use client';

import { Text, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import {
  getKeywords,
  postKeyword,
  deleteKeyword,
} from '../../../lib/features/keywords/keywordsSlice';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import FavoriteTag from '../favorites/[tconst]/components/FavoriteTag';

export default function Page() {
  const dispatch = useAppDispatch();
  const {
    data: keywords = [],
    loading,
    error,
  } = useAppSelector(state => state.keywords);
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);
  const [existingKeywords, setExistingKeywords] = useState<string[]>([]);
  const toast = useToast();

  useEffect(() => {
    dispatch(getKeywords()).then(action => {
      if (getKeywords.fulfilled.match(action)) {
        setExistingKeywords(action.payload.map((kw: any) => kw.keyword));
      }
    });
  }, [dispatch]);

  const handleKeywordClick = async (keyword: string) => {
    if (selectedKeyword !== keyword) {
      setSelectedKeyword(keyword);
      const resultAction = await dispatch(postKeyword(keyword));

      if (postKeyword.fulfilled.match(resultAction)) {
        setExistingKeywords(prev => [...prev, keyword]);

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
    try {
      const resultAction = await dispatch(deleteKeyword(keyword));
      if (deleteKeyword.fulfilled.match(resultAction)) {
        setExistingKeywords(prev => prev.filter(kw => kw !== keyword));
        dispatch(getKeywords());
      } else {
        throw new Error('Failed to delete keyword');
      }
    } catch (error) {
      toast({
        title: 'Erro ao deletar palavra-chave.',
        description: 'Ocorreu um erro ao tentar deletar a palavra-chave.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <div>
      <Text fontSize='2xl' as='b'>
        Keywords
      </Text>
      <br />
      <br />
      {loading && <div>Carregando...</div>}
      {error && <div>Error: {error}</div>}
      {!loading && !error && (
        <FavoriteTag
          keywords={
            Array.isArray(keywords) ? keywords.map(kw => kw.keyword) : []
          }
          onKeywordClick={handleKeywordClick}
          onKeywordDelete={handleKeywordDelete}
          existingKeywords={existingKeywords}
        />
      )}
    </div>
  );
}
