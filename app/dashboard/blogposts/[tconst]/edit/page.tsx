'use client';

import { Input, Button, Text, Checkbox } from '@chakra-ui/react';
import arrowLeft from '@iconify/icons-lucide/arrow-left';
import { Icon } from '@iconify/react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../../lib/hooks';
import { fetchBlogPost, updateBlogPost } from '../../../../../lib/features/blogPosts/blogPostsSlice';
import * as S from './styles';
import { formatDate } from '../../../../../utils/dateUtils';
import GoBack from '@/app/ui/GoBack';

export default function Page() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { tconst } = useParams();
  const tconstString = Array.isArray(tconst) ? tconst[0] : tconst;

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
    }
  }, [data]);

  const handleSave = () => {
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
    };
    dispatch(updateBlogPost(updatedData));
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
      <Input
        onChange={e => setIntroduction(e.target.value)}
        type='text'
        value={introduction}
      />
      <br />
      <p>Stars and Characters</p>
      <Input
        onChange={e => setStarsAndCharacters(e.target.value)}
        type='text'
        value={starsAndCharacters}
      />
      <br />
      <p>Historical Context</p>
      <Input
        onChange={e => setHistoricalContext(e.target.value)}
        type='text'
        value={historicalContext}
      />
      <br />
      <p>Cultural Importance</p>
      <Input
        onChange={e => setCulturalImportance(e.target.value)}
        type='text'
        value={culturalImportance}
      />
      <br />
      <p>Technical Analysis</p>
      <Input
        onChange={e => setTechnicalAnalysis(e.target.value)}
        type='text'
        value={technicalAnalysis}
      />
      <br />
      <p>Original Movie Soundtrack</p>
      <Input
        onChange={e => setOriginalMovieSoundtrack(e.target.value)}
        type='text'
        value={originalMovieSoundtrack}
      />
      <br />
      <p>Conclusion</p>
      <Input
        onChange={e => setConclusion(e.target.value)}
        type='text'
        value={conclusion}
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
      <Button colorScheme='blue' onClick={handleSave}>
        Save
      </Button>
    </S.PageContainer>
  );
}
