'use client';

import { Input, Button, Text, useToast, Textarea } from '@chakra-ui/react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import {
  fetchBlogPost,
  updateBlogPost,
} from '../../../../../lib/features/blogPosts/blogPostsSlice';
import {
  fetchAllImageUrls,
  selectImageUrls,
  uploadOpinionImage,
  selectImageNames,
  deleteImage,
} from '../../../../../lib/features/uploadImages/uploadImagesSlice';
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
  const imageUrls = useAppSelector(selectImageUrls);
  const imageNames = useAppSelector(selectImageNames);

  // console.log('objectName', objectName);

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
    if (typeof tconstString === 'string') {
      dispatch(fetchAllImageUrls({ tconst: tconstString }));
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

  useEffect(() => {
    console.log('Nomes das imagens:', imageNames);
  }, [imageNames]);

  const handleUploadImage = async () => {
    if (selectedFile) {
      const loadingToastId = toast({
        title: 'Enviando imagem...',
        description: 'Aguarde enquanto a imagem é enviada.',
        status: 'info',
        duration: null,
        isClosable: true,
      });

      try {
        const result = await dispatch(
          uploadOpinionImage({ tconst: tconstString, file: selectedFile })
        ).unwrap();

        console.log('Nome do objeto (imagem):', result.object_name);

        toast.close(loadingToastId);

        toast({
          title: 'Sucesso!',
          description: 'A imagem foi enviada com sucesso.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });

        dispatch(fetchAllImageUrls({ tconst: tconstString }));
      } catch (error) {
        toast.close(loadingToastId);

        toast({
          title: 'Erro ao enviar',
          description: 'Ocorreu um erro ao tentar enviar a imagem.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
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

  const handleDeleteImage = async (filename: string) => {
    try {
      await dispatch(deleteImage({ tconst: tconstString, filename })).unwrap();
      toast({
        title: 'Imagem deletada',
        description: `A imagem ${filename} foi deletada com sucesso.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // Atualiza a lista de imagens após a exclusão
      dispatch(fetchAllImageUrls({ tconst: tconstString }));
    } catch (error) {
      toast({
        title: 'Erro ao deletar',
        description: 'Ocorreu um erro ao tentar deletar a imagem.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleSave = async () => {
    toast({
      title: 'Salvando',
      description: 'Salvando as alterações.',
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
      <h1>Editar Post</h1>
      <div>
        {imageUrls.map((url, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Image
              src={url}
              alt={`Imagem ${index + 1}`}
              width={406}
              height={295}
              layout='fixed'
            />
            <Button
              onClick={() => handleDeleteImage(imageNames[index])}
              colorScheme='red'
            >
              Deletar
            </Button>
          </div>
        ))}
      </div>
      <br />
      <br />
      <h2>Inserir imagens do filme</h2>
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
          Enviar
        </Button>
      </div>
      <br />
      <h2>Título do Post</h2>
      <Input
        onChange={e => setTitle(e.target.value)}
        type='text'
        value={title}
      />
      <br />
      <h2>Título Original</h2>
      <Input
        onChange={e => setPrimaryTitle(e.target.value)}
        type='text'
        value={primaryTitle}
      />
      <br />
      <h2>Introdução</h2>
      <Textarea
        onChange={e => setIntroduction(e.target.value)}
        value={introduction}
        rows={6}
      />
      <br />
      <h2>Elenco e Personagens</h2>
      <Textarea
        onChange={e => setStarsAndCharacters(e.target.value)}
        value={starsAndCharacters}
        rows={6}
      />
      <br />
      <h2>Contexto Histórico</h2>
      <Textarea
        onChange={e => setHistoricalContext(e.target.value)}
        value={historicalContext}
        rows={6}
      />
      <br />
      <h2>Importância Cultural</h2>
      <Textarea
        onChange={e => setCulturalImportance(e.target.value)}
        value={culturalImportance}
        rows={6}
      />
      <br />
      <h2>Análise Técnica</h2>
      <Textarea
        onChange={e => setTechnicalAnalysis(e.target.value)}
        value={technicalAnalysis}
        rows={6}
      />
      <br />
      <br />
      <h2>Trilha Sonora Original</h2>
      <Textarea
        onChange={e => setOriginalMovieSoundtrack(e.target.value)}
        value={originalMovieSoundtrack}
        rows={6}
      />
      <br />
      <h2>Conclusão</h2>
      <Textarea
        onChange={e => setConclusion(e.target.value)}
        value={conclusion}
        rows={6}
      />
      <br />
      <h2>URL do Poster de divulgação do filme</h2>
      <Input
        onChange={e => setPosterUrl(e.target.value)}
        type='text'
        value={posterUrl}
      />
      <br />
      <h2>Data de Criação</h2>
      <Input
        onChange={e => setCreatedAt(e.target.value)}
        type='text'
        value={createdAt}
      />
      <br />
      <h2>Referências</h2>
      {references.map((reference, index) => (
        <>
          <h3>Referência {index + 1}</h3>
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
