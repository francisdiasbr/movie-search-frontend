'use client';

import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useParams } from 'next/navigation';
import arrowLeft from '@iconify/icons-lucide/arrow-left';
import { Icon } from '@iconify/react';
import { Button, Input, Text, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/navigation';
import { editDetails, fetchDetails, resetEditStatus } from '@/lib/features/movie/movieDetailsSlice';
import * as S from './styles';

export default function Page() {
  const dispatch = useAppDispatch();
  const { data, editStatus } = useAppSelector((state) => state.moviesDetails);
  const { tconst } = useParams();
  const router = useRouter();
  const toast = useToast();

  const [originalTitle, setOriginalTitle] = useState('');
  const [startYear, setStartYear] = useState<string>('')
  const [soundtrack, setSoundtrack] = useState<string>('')
  const [wiki, setWiki] = useState<string>('')

  useEffect(() => {
    if (tconst) {
      dispatch(fetchDetails(tconst))
    }
  }, [dispatch, tconst]);


  useEffect(() => {
    if (data) {
      setOriginalTitle(data.originalTitle || '');
      setStartYear(data.startYear || null);
      setSoundtrack(data.soundtrack || null);
      setWiki(data.wiki || null);
    }
  }, [data]);

  useEffect(() => {
    if (editStatus === 'succeeded') {
      setOriginalTitle(data?.originalTitle);
      setStartYear(data?.startYear);
      setSoundtrack(data?.soundtrack);
      setWiki(data?.wiki);
      toast({
        title: 'Filme atualizado',
        description: 'Detalhes atualizados com sucesso',
        status: 'success',
        duration: 2000,
        isClosable: true,
        variant: 'top-accent'
      });
    }
    if (editStatus === 'failed') {
      toast({
        title: 'Erro ao atualizar',
        description: 'Não foi possível atualizar os detalhes do filme',
        status: 'error',
        duration: 3000,
        isClosable: true,
        variant: 'top-accent'
      });
    }
    if (editStatus === 'succeeded' || editStatus === 'failed') {
      dispatch(resetEditStatus());
    }
  }, [editStatus, data, toast, dispatch]);

  const handleSave = () => {
    if (!tconst) {
      console.error('tconst is undefined! Cannot save without tconst.');
      return;
    }

    const updatedData = {
      tconst: tconst as string,
      originalTitle,
      startYear: Number(startYear),
      soundtrack,
      wiki
    };
    dispatch(editDetails(updatedData));
  };

  return (
    <S.PageContainer>
      <S.BackButton onClick={() => router.back()}>
        <Icon fontSize={24} icon={arrowLeft} />
      </S.BackButton>
      <Text fontSize='2xl' as='b'>Movie Edit Page</Text>
      <p>tconst</p>
      <Input
        isReadOnly
        type="text"
        value={data?.tconst}
      />
      <p>primary title</p>
      <Input
        onChange={(e) => (setOriginalTitle(e.target.value))}
        type="text"
        value={originalTitle}
      />
      <p>Start year</p>
      <Input
        onChange={(e) => setStartYear(e.target.value)}
        type="number"
        value={startYear}
      />
      <p>Soundtrack</p>
      <Input
        onChange={(e) => setSoundtrack(e.target.value)}
        type="text"
        value={soundtrack}
      />
      <p>Wiki</p>
      <Input
        onChange={(e) => setWiki(e.target.value)}
        type="text"
        value={wiki}
      />
      <br/>
      <Button colorScheme="blue" onClick={handleSave}>Save</Button>
    </S.PageContainer>
  );
}
