'use client';

import {
  Button,
  Input,
  Text,
  useToast,
  Checkbox,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';
import arrowLeft from '@iconify/icons-lucide/arrow-left';
import { Icon } from '@iconify/react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import {
  editDetails,
  fetchDetails,
  resetEditStatus,
} from '../../../../../lib/features/movie/movieDetailsSlice';
import {
  submitOpinion,
  selectOpinionStatus,
  selectOpinionError,
} from '../../../../../lib/features/opinion/opinionSlice';
import { useAppDispatch, useAppSelector } from '../../../../../lib/hooks';
import * as S from './styles';

export default function Page() {
  const dispatch = useAppDispatch();
  const { data, editStatus } = useAppSelector(state => state.moviesDetails);
  const { tconst } = useParams();
  const router = useRouter();
  const toast = useToast();
  const opinionStatus = useAppSelector(selectOpinionStatus);
  const opinionError = useAppSelector(selectOpinionError);

  const [originalTitle, setOriginalTitle] = useState('');
  const [soundtrack, setSoundtrack] = useState<string>('');
  const [wiki, setWiki] = useState<string>('');
  const [watched, setWatched] = useState<boolean>(false);
  const [rate, setRate] = useState<string>('');
  const [opinion, setOpinion] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (typeof tconst === 'string') {
      dispatch(fetchDetails(tconst));
    }
  }, [dispatch, tconst]);

  useEffect(() => {
    if (data) {
      setOriginalTitle(data.originalTitle || '');
      setSoundtrack(data.soundtrack || null);
      setWiki(data.wiki || null);
      setWatched(data.watched || false);
    }
  }, [data]);

  useEffect(() => {
    if (editStatus === 'succeeded') {
      setOriginalTitle(data?.originalTitle);
      setSoundtrack(data?.soundtrack);
      setWiki(data?.wiki);
      setWatched(data.watched || false);
      toast({
        title: 'Filme atualizado',
        description: 'Detalhes atualizados com sucesso',
        status: 'success',
        duration: 2000,
        isClosable: true,
        variant: 'top-accent',
      });
    }
    if (editStatus === 'failed') {
      toast({
        title: 'Erro ao atualizar',
        description:
          data?.error || 'Não foi possível atualizar os detalhes do filme',
        status: 'error',
        duration: 3000,
        isClosable: true,
        variant: 'top-accent',
      });
    }
    if (editStatus === 'succeeded' || editStatus === 'failed') {
      dispatch(resetEditStatus());
    }
  }, [editStatus, data, toast, dispatch]);

  useEffect(() => {
    dispatch(resetEditStatus());
  }, [dispatch]);

  const handleSave = () => {
    if (!tconst) {
      console.error('tconst is undefined! Cannot save without tconst.');
      return;
    }

    const updatedData = {
      tconst: tconst as string,
      originalTitle,
      soundtrack,
      wiki,
      watched,
    };
    dispatch(editDetails(updatedData));
  };

  const handleSubmitOpinion = () => {
    if (!tconst || Array.isArray(tconst)) {
      console.error(
        'tconst is undefined or is an array! Cannot submit opinion without a valid tconst.'
      );
      return;
    }

    dispatch(submitOpinion({ tconst, opinion, rate }));
  };

  useEffect(() => {
    if (opinionStatus === 'succeeded') {
      toast({
        title: 'Opinião enviada',
        description: 'Sua opinião foi enviada com sucesso',
        status: 'success',
        duration: 2000,
        isClosable: true,
        variant: 'top-accent',
      });
      setIsOpen(false);
    } else if (opinionStatus === 'failed') {
      toast({
        title: 'Erro ao enviar opinião',
        description: opinionError || 'Não foi possível enviar sua opinião',
        status: 'error',
        duration: 3000,
        isClosable: true,
        variant: 'top-accent',
      });
    }
  }, [opinionStatus, opinionError, toast, setIsOpen]);

  return (
    <S.PageContainer>
      <S.BackButton onClick={() => router.back()}>
        <Icon fontSize={24} icon={arrowLeft} />
      </S.BackButton>
      <Text fontSize='2xl' as='b'>
        Editar Filme
      </Text>
      <p>IMDB ID (tconst)</p>
      <Input
        isReadOnly
        type='text'
        value={data?.tconst}
        bg='gray.100'
        cursor='not-allowed'
        _hover={{ bg: 'gray.100' }}
      />
      <br />
      <p>Original title</p>
      <Input
        isReadOnly
        type='text'
        value={originalTitle}
        bg='gray.100'
        cursor='not-allowed'
        _hover={{ bg: 'gray.100' }}
      />
      <br />
      <p>Soundtrack</p>
      <Input
        onChange={e => setSoundtrack(e.target.value)}
        type='text'
        value={soundtrack}
      />
      <br />
      <p>Wiki</p>
      <Input onChange={e => setWiki(e.target.value)} type='text' value={wiki} />
      <br />
      <p>Watched</p>
      <Checkbox
        isChecked={watched}
        onChange={e => setWatched(e.target.checked)}
      >
        Watched
      </Checkbox>
      <br />
      <div style={{ display: 'flex', gap: '16px' }}>
        <Button colorScheme='gray' onClick={() => setIsOpen(true)}>
          Adicionar Opinião
        </Button>
        <Button colorScheme='blue' onClick={handleSave}>
          Salvar
        </Button>
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Insira a sua opinião</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>Rate</p>
            <Input
              type='text'
              value={rate}
              onChange={e => setRate(e.target.value)}
            />
            <p>Opinion</p>
            <Input
              type='text'
              value={opinion}
              onChange={e => setOpinion(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' onClick={handleSubmitOpinion}>
              Enviar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </S.PageContainer>
  );
}
