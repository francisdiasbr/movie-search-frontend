import { useSearchParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import { clearState, postAuthoralReview } from '../../../../lib/features/authoralReview/authoralReviewSlice';
import { useAppDispatch, useAppSelector } from '../../../../lib/hooks';
import { useToastNotifications } from '../../../hooks/useToastNotifications';
import * as S from './styles';

const AuthoralReviewForm = () => {
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.authoralReviews);
  const { showSuccess, showError } = useToastNotifications();
  const [searchParams] = useSearchParams();

  const urlTconst = searchParams.get('tconst') || '';
  const urlPrimaryTitle = searchParams.get('primaryTitle') || '';

  const [primaryTitle, setPrimaryTitle] = useState(urlPrimaryTitle);
  const [contentPt, setContentPt] = useState('');
  const [contentEn, setContentEn] = useState('');
  const [tconst, setTconst] = useState(urlTconst);

  useEffect(() => {
    setPrimaryTitle(urlPrimaryTitle);
    setTconst(urlTconst);
  }, [urlPrimaryTitle, urlTconst]);

  useEffect(() => {
    dispatch(clearState());
    return () => {
      dispatch(clearState());
    };
  }, [dispatch]);

  const validateTconst = (tconst: any) => /^tt\d{7,8}$/.test(tconst);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateTconst(tconst)) {
      showError({ title: "Formato de tconst inválido. Deve começar com 'tt' seguido por 7 ou 8 dígitos." });
      return;
    }

    const formattedContentPt = contentPt.replace(/\n/g, '\n\n').trim();
    const formattedContentEn = contentEn.replace(/\n/g, '\n\n').trim();

    const reviewData = {
      content: {
        pt: { text: formattedContentPt },
        en: { text: formattedContentEn },
      },
      tconst,
      primaryTitle,
    };

    dispatch(postAuthoralReview(reviewData));
  };

  useEffect(() => {
    if (status === 'idle') return;

    if (status === 'succeeded') {
      showSuccess({ title: 'Resenha adicionada com sucesso!' });
      setPrimaryTitle('');
      setContentPt('');
      setContentEn('');
      setTconst('');
      dispatch(clearState());
    }

    if (status === 'failed') {
      const errorMessage = (() => {
        if (error === 'Movie not found in favorites') {
          return 'Filme não encontrado nos favoritos';
        }
        if (!tconst) {
          return 'tconst não informado';
        }
        if (typeof error === 'string') {
          return error;
        }
        return 'Erro ao salvar a resenha';
      })();

      showError({ title: errorMessage });
      dispatch(clearState());
    }
  }, [status, error, dispatch, tconst]);

  return (
    <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap:'16px'}}>
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
      <button disabled={status === 'loading'} type='submit'>
        {status === 'loading' ? 'Enviando...' : 'Enviar'}
      </button>
    </form>
  );
};

export default AuthoralReviewForm;
