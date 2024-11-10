import { Text } from "@chakra-ui/react";

const DashboardPage = () => {
  return (
    <>
      <Text fontSize='2xl' as='b'>Movie search</Text>
      <br/>
      <br/>
      <Text fontSize='2xl'>Search movies</Text>
      <p>Pesquise o filme através do nome ou IMDb ID (tconst do filme no IMDb)</p>
      <br/>
      <Text fontSize='2xl'>Favorites</Text>
      <p>Consulte a sua lista de filmes favoritos e escute a playlist do filme através do Spotify</p>
      <br/>
      <Text fontSize='2xl'>Resenhas</Text>
      <p>Escreva uma resenha para um filme assistido e leia resenhas autorais ou geradas por GenAI</p>

    </>
  )
}

export default DashboardPage;
