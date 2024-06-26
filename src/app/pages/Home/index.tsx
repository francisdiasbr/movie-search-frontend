import React, { useEffect, useState } from 'react';
import { Button, Text, TextInput } from 'react-native-paper';

import { fetchMovies } from '../../../api/store/actions/moviesActions';
import { useAppDispatch } from '../../../api/store/dispatch';
import { useGlobalState } from '../../../api/store/useState';
import MainLayout from '../../components/MainLayout';
import * as S from './styles';

const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [text, setText] = useState<string>('');

  const dispatch = useAppDispatch();
  const movies = useGlobalState(state => state.movies);
  const { status, moviesList } = movies;

  const handleSearchMovies = () => {
    setIsLoading(true)
    dispatch(fetchMovies(text));
  }

  useEffect(() => {
    if(status === 'succeeded' || status === 'failed') {
      setIsLoading(false)
    }
  }, [status])

  return (
    <MainLayout>
      <Text variant='displaySmall'>🎬 Movie Tipster 🎬</Text>
      <Text variant='headlineSmall'>Powered by gpt-3.5-turbo</Text>
      <S.Container>
        <S.Top>
          <Text variant='bodyMedium'>Receba uma sugestão de filme personalizada para assistir hoje à noite. Como nos velhos tempos!</Text>
          <Text variant='bodyMedium'>O Movie Tipster compara os seus últimos filmes assistidos e fornece uma sugestão aprimorada com base no que você está procurando</Text>
        </S.Top>
        <Text variant='bodyMedium'>O que você está procurando hoje?</Text>
        <TextInput
          label=""
          value={text}
          onChangeText={setText}
        />
        <Button
          mode="contained" 
          onPress={handleSearchMovies}
          loading={isLoading}
        >
          {isLoading ? '' : 'Buscar'}
        </Button>
        <Text variant='bodyMedium'>Sugestão de filme:</Text>
        {status === 'loading' ? (
          <Text>Carregando</Text>
        ) : (
          <Text variant='bodyMedium'>{moviesList}</Text>
        )}
      </S.Container>
    </MainLayout>
  )
}

export default HomeScreen;