import { Text } from '@chakra-ui/react';

const DashboardPage = () => {
  return (
    <>
      <Text fontSize='3xl' as='b'>
        Bem-vindo(a) ao The Movie Search!
      </Text>
      <br />
      <br />
      <Text fontSize='2xl'>
        🎥 Pesquisar Filme: Busque pelos filmes que deseja incluir na lista de
        favoritos
      </Text>
      <br />
      <p>
        <b>Pesquise</b> por filmes consultando no banco de dados do Internet
        Movie Database (IMDb)
      </p>
      <br />
      <p>
        <b>Explore</b> uma coleção de <b>690 mil</b> de filmes e desfrute cada
        vez mais da Sétima Arte!
      </p>
      <br />
      <br />
      <br />
      <br />
      <Text fontSize='2xl'>
        🍿 Favoritos: Faça a sua curadoria única de filmes
      </Text>
      <br />
      <p>
        <b>Descubra e salve seus filmes favoritos</b>
      </p>
      <br />
      <p>
        <b>Seja o Curador do Seu Próprio Cinema:</b> crie uma lista de favoritos
        e seja um curador de cinema. Adicione seus filmes favoritos à lista e
        aproveite a trilha sonora no Spotify.
      </p>
      <br />
      <p>
        <b>Assista o filme como parte da experiência:</b> tenha acesso a magnet
        links para download do filme direto no BitTorrent 🌟
      </p>
      <br />
      <br />
      <br />
      <br />
      <Text fontSize='2xl'>📑 Blog Posts</Text>
      <br />
      <p>Gere e leia artigos sobre os filmes favoritos assistidos</p>
    </>
  );
};

export default DashboardPage;
