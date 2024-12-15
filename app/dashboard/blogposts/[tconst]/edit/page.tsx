'use client';

import { Input, Button, Text, useToast, Textarea } from '@chakra-ui/react';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import GoBack from '../../../../../app/ui/GoBack';
import {
  fetchBlogPost,
  updateBlogPost,
} from '../../../../../lib/features/blogPosts/blogPostsSlice';
import { useAppDispatch, useAppSelector } from '../../../../../lib/hooks';
import * as S from './styles';

export default function Page() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { tconst } = useParams();
  const tconstString = Array.isArray(tconst) ? tconst[0] : tconst;
  const toast = useToast();

  const { data } = useAppSelector(state => state.blogPosts);
  const [title, setTitle] = useState('');
  const [primaryTitle, setPrimaryTitle] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [starsAndCharacters, setStarsAndCharacters] = useState('');
  const [historicalContext, setHistoricalContext] = useState('');
  const [culturalImportance, setCulturalImportance] = useState('');
  const [technicalAnalysis, setTechnicalAnalysis] = useState('');
  const [originalMovieSoundtrack, setOriginalMovieSoundtrack] = useState('');
  const [conclusion, setConclusion] = useState('');
  const [posterUrl, setPosterUrl] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [references, setReferences] = useState<string[]>(['', '', '', '', '']);

  useEffect(() => {
    if (tconstString) {
      dispatch(fetchBlogPost(tconstString));
    }
  }, [dispatch, tconstString]);

  useEffect(() => {
    if (data) {
      setTitle(data.title || '');
      setPrimaryTitle(data.primaryTitle || '');
      setIntroduction(data.introduction || '');
      setStarsAndCharacters(data.stars_and_characters || '');
      setHistoricalContext(data.historical_context || '');
      setCulturalImportance(data.cultural_importance || '');
      setTechnicalAnalysis(data.technical_analysis || '');
      setOriginalMovieSoundtrack(data.original_movie_soundtrack || '');
      setConclusion(data.conclusion || '');
      setPosterUrl(data.poster_url || '');
      setCreatedAt(data.created_at || '');
      setReferences(data.references || []);
    }
  }, [data]);

  const handleSave = async () => {
    toast({
      title: 'Salvando...',
      description: 'Por favor, aguarde enquanto salvamos suas alterações.',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });

    try {
      const updatedData = {
        tconst: tconstString,
        title,
        primaryTitle,
        introduction,
        stars_and_characters: starsAndCharacters,
        historical_context: historicalContext,
        cultural_importance: culturalImportance,
        technical_analysis: technicalAnalysis,
        original_movie_soundtrack: originalMovieSoundtrack,
        conclusion,
        poster_url: posterUrl,
        created_at: createdAt,
        references: references,
      };
      await dispatch(updateBlogPost(updatedData)).unwrap();

      toast({
        title: 'Sucesso!',
        description: 'As alterações foram salvas com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Erro ao salvar',
        description: 'Ocorreu um erro ao tentar salvar as alterações.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <S.PageContainer>
      <GoBack />
      <Text fontSize='2xl' as='b'>
        Editar Post
      </Text>
      <p>Title</p>
      <Input
        onChange={e => setTitle(e.target.value)}
        type='text'
        value={title}
      />
      <br />
      <p>Primary Title</p>
      <Input
        onChange={e => setPrimaryTitle(e.target.value)}
        type='text'
        value={primaryTitle}
      />
      <br />
      <p>Introduction</p>
      <Textarea
        onChange={e => setIntroduction(e.target.value)}
        value={introduction}
        rows={6}
      />
      <br />
      <p>Stars and Characters</p>
      <Textarea
        onChange={e => setStarsAndCharacters(e.target.value)}
        value={starsAndCharacters}
        rows={6}
      />
      <br />
      <p>Historical Context</p>
      <Textarea
        onChange={e => setHistoricalContext(e.target.value)}
        value={historicalContext}
        rows={6}
      />
      <br />
      <p>Cultural Importance</p>
      <Textarea
        onChange={e => setCulturalImportance(e.target.value)}
        value={culturalImportance}
        rows={6}
      />
      <br />
      <p>Technical Analysis</p>
      <Textarea
        onChange={e => setTechnicalAnalysis(e.target.value)}
        value={technicalAnalysis}
        rows={6}
      />
      <br />
      <br />
      <p>Original Movie Soundtrack</p>
      <Textarea
        onChange={e => setOriginalMovieSoundtrack(e.target.value)}
        value={originalMovieSoundtrack}
        rows={6}
      />
      <br />
      <p>Conclusion</p>
      <Textarea
        onChange={e => setConclusion(e.target.value)}
        value={conclusion}
        rows={6}
      />
      <br />
      <p>Poster URL</p>
      <Input
        onChange={e => setPosterUrl(e.target.value)}
        type='text'
        value={posterUrl}
      />
      <br />
      <p>Created At</p>
      <Input
        onChange={e => setCreatedAt(e.target.value)}
        type='text'
        value={createdAt}
      />
      <br />
      <p>References</p>
      {references.map((reference, index) => (
        <div key={index}>
          <p>Reference {index + 1}</p>
          <Input
            onChange={e => {
              const newReferences = [...references];
              newReferences[index] = e.target.value;
              setReferences(newReferences);
            }}
            type='text'
            value={reference}
            style={{ marginBottom: '10px' }}
          />
          <br />
        </div>
      ))}
      <div style={{ display: 'flex', gap: '10px' }}>
        <Button
          onClick={() => setReferences([...references, ''])}
          colorScheme='blue'
        >
          Adicionar referência
        </Button>
        <Button colorScheme='blue' onClick={handleSave}>
          Salvar
        </Button>
      </div>
    </S.PageContainer>
  );
}
