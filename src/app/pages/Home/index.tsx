import React, { useState } from 'react';
import { Button, Text, TextInput } from 'react-native-paper';

import BaseService from '../../../api/service';
import MainLayout from '../../components/MainLayout';
import * as S from './styles';

export const fetchMovies = async (query: any) => {
  const url = `/search?query=${encodeURIComponent(query)}`;
  const response = await BaseService.get(url);
  return response;
}

const HomeScreen = () => {

  const [text, setText] = useState('');
  const [movieResponse, setMovieResponse] = useState([]);

  const handleSearchMovies = async () => {
    try {
      const movies = await fetchMovies(text);
      setMovieResponse(movies.response);
    } catch (error) {
      console.log(error);
    }
  }

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
        <Button mode="contained" onPress={handleSearchMovies}>
          Buscar
        </Button>
        <Text variant='bodyMedium'>Sugestão de filme:</Text>
        <Text variant='bodyMedium'>{movieResponse}</Text>
      </S.Container>
    </MainLayout>
  )
}

export default HomeScreen;