'use client';

import { Input, Button, Text, useToast, Textarea } from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import {
  fetchBlogPost,
  updateBlogPost,
} from '../../../../../lib/features/blogPosts/blogPostsSlice';
import { uploadOpinionImage } from '../../../../../lib/features/uploadImages/uploadImagesSlice';
import { useAppDispatch, useAppSelector } from '../../../../../lib/hooks';
import GoBack from '../../../../ui/GoBack';
import * as S from './styles';

export default function Page() {
  const dispatch = useAppDispatch();
  const { tconst } = useParams();
  const tconstString = Array.isArray(tconst) ? tconst[0] : tconst;
  const toast = useToast();

  const { data } = useAppSelector(state => state.blogPosts);
  const { objectName } = useAppSelector(state => state.uploadImages);

  console.log('objectName', objectName);

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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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

  const handleUploadImage = async () => {
    if (selectedFile) {
      await dispatch(
        uploadOpinionImage({ tconst: tconstString, file: selectedFile })
      );
      console.log('objectName', objectName);
    } else {
      toast({
        title: 'Nenhum arquivo selecionado',
        description: 'Por favor, selecione um arquivo antes de enviar.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleSave = async () => {
    toast({
      title: 'Salvando...',
      description: 'Aguarde enquanto salvamos as alterações.',
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

      <br />
      <br />
      <p>Inserir imagens do filme</p>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
        <Input
          type='file'
          onChange={e => {
            if (e.target.files && e.target.files[0]) {
              setSelectedFile(e.target.files[0]);
            }
          }}
        />
        <br />
        <Button onClick={handleUploadImage} colorScheme='blue'>
          Enviar Foto
        </Button>
      </div>
      <br />
      <strong>Título do Post</strong>
      <Input
        onChange={e => setTitle(e.target.value)}
        type='text'
        value={title}
      />
      <br />
      <p style={{ fontWeight: 'bold' }}>Título Original</p>
      <Input
        onChange={e => setPrimaryTitle(e.target.value)}
        type='text'
        value={primaryTitle}
      />
      <br />
      <p style={{ fontWeight: 'bold' }}>Introdução</p>
      <Textarea
        onChange={e => setIntroduction(e.target.value)}
        value={introduction}
        rows={6}
      />
      <br />
      <p style={{ fontWeight: 'bold' }}>Elenco e Personagens</p>
      <Textarea
        onChange={e => setStarsAndCharacters(e.target.value)}
        value={starsAndCharacters}
        rows={6}
      />
      <br />
      <p style={{ fontWeight: 'bold' }}>Contexto Histórico</p>
      <Textarea
        onChange={e => setHistoricalContext(e.target.value)}
        value={historicalContext}
        rows={6}
      />
      <br />
      <p style={{ fontWeight: 'bold' }}>Importância Cultural</p>
      <Textarea
        onChange={e => setCulturalImportance(e.target.value)}
        value={culturalImportance}
        rows={6}
      />
      <br />
      <p style={{ fontWeight: 'bold' }}>Análise Técnica</p>
      <Textarea
        onChange={e => setTechnicalAnalysis(e.target.value)}
        value={technicalAnalysis}
        rows={6}
      />
      <br />
      <br />
      <p style={{ fontWeight: 'bold' }}>Trilha Sonora Original</p>
      <Textarea
        onChange={e => setOriginalMovieSoundtrack(e.target.value)}
        value={originalMovieSoundtrack}
        rows={6}
      />
      <br />
      <p style={{ fontWeight: 'bold' }}>Conclusão</p>
      <Textarea
        onChange={e => setConclusion(e.target.value)}
        value={conclusion}
        rows={6}
      />
      <br />
      <p style={{ fontWeight: 'bold' }}>URL do Poster de divulgação do filme</p>
      <Input
        onChange={e => setPosterUrl(e.target.value)}
        type='text'
        value={posterUrl}
      />
      <br />
      <p style={{ fontWeight: 'bold' }}>Data de Criação</p>
      <Input
        onChange={e => setCreatedAt(e.target.value)}
        type='text'
        value={createdAt}
      />
      <br />
      <p style={{ fontWeight: 'bold' }}>Referências</p>
      {references.map((reference, index) => (
        <>
          <p>Referência {index + 1}</p>
          <Input
            onChange={e => {
              const newReferences = [...references];
              newReferences[index] = e.target.value;
              setReferences(newReferences);
            }}
            type='text'
            value={reference}
          />
          <br />
        </>
      ))}
      <div style={{ display: 'flex', gap: '10px' }}>
        <Button
          onClick={() => setReferences([...references, ''])}
          colorScheme='blue'
        >
          Adicionar referência
        </Button>
      </div>
      <br />
      <Button colorScheme='blue' onClick={handleSave}>
        Salvar
      </Button>
    </S.PageContainer>
  );
}
