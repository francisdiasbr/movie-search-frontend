import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../../lib/hooks';
import { PARAGRAPHS } from '../../../formatter';
import { useStatusToast } from '../../../hooks/useStatusToast';
import { useToastNotifications } from '../../../hooks/useToastNotifications';
import Button from '../../../ui/Button';
import { isValidTconst } from '../../../util/tconst';
import { createReview, resetWriteReview } from '../reducer/writeReviewSlice';
import * as S from './styles';

const AuthoralReviewForm = () => {
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.writeReview);
  const { showError } = useToastNotifications();
  const [searchParams] = useSearchParams();

  const urlTconst = searchParams.get('tconst') || '';
  const urlPrimaryTitle = searchParams.get('primaryTitle') || '';

  const [primaryTitle, setPrimaryTitle] = useState(urlPrimaryTitle);
  const [contentPt, setContentPt] = useState('');
  const [contentEn, setContentEn] = useState('');
  const [tconst, setTconst] = useState(urlTconst);

  useEffect(() => () => {
    dispatch(resetWriteReview());
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidTconst(tconst)) {
      showError({ title: "Formato de tconst inválido. Deve começar com 'tt' seguido por 7 ou 8 dígitos." });
      return;
    }

    const reviewData = {
      content: {
        pt: { text: PARAGRAPHS(contentPt) },
        en: { text: PARAGRAPHS(contentEn) },
      },
      tconst,
      primaryTitle,
    };

    dispatch(createReview(reviewData));
  };

  useStatusToast({
    error,
    errorMessage: (message) => {
      if (message === 'Movie not found in favorites') return 'Filme não encontrado nos favoritos';
      if (!tconst) return 'tconst não informado';
      return message || 'Erro ao salvar a resenha';
    },
    onSuccess: () => {
      setPrimaryTitle('');
      setContentPt('');
      setContentEn('');
      setTconst('');
    },
    reset: () => dispatch(resetWriteReview()),
    status,
    successMessage: 'Resenha adicionada com sucesso!',
  });

  return (
    <S.Form onSubmit={handleSubmit}>
      <S.InputGroup>
        <label htmlFor='primaryTitle'>Título do Filme</label>
        <input
          id='primaryTitle'
          value={primaryTitle}
          onChange={(e) => setPrimaryTitle(e.target.value)}
          placeholder='Insira o título do filme'
          disabled={!!urlPrimaryTitle}
          required
        />
      </S.InputGroup>
      <S.InputGroup>
        <label htmlFor='tconst'>tconst (IMDb)</label>
        <input
          id='tconst'
          placeholder='Código tt do IMDB'
          value={tconst}
          onChange={(e) => setTconst(e.target.value)}
          disabled={!!urlTconst}
          required
        />
      </S.InputGroup>
      <S.InputGroup>
        <label htmlFor='contentPt'>Resenha em Português</label>
        <textarea
          id='contentPt'
          placeholder='Digite sua resenha em português'
          value={contentPt}
          onChange={(e) => setContentPt(e.target.value)}
          rows={10}
          required
        />
      </S.InputGroup>
      <S.InputGroup>
        <label htmlFor='contentEn'>Resenha em Inglês</label>
        <textarea
          id='contentEn'
          placeholder='Digite sua resenha em inglês'
          value={contentEn}
          onChange={(e) => setContentEn(e.target.value)}
          rows={10}
          required
        />
      </S.InputGroup>
      <S.Actions>
        <Button loading={status === 'loading'} type='submit'>
          Enviar
        </Button>
      </S.Actions>
    </S.Form>
  );
};

export default AuthoralReviewForm;
