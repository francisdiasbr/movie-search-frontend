import { Text } from "@chakra-ui/react";

const DashboardPage = () => {
  return (
    <>
      <Text fontSize='2xl' as='b'>Movie search</Text>
      <br/>
      <br/>
      <Text fontSize='2xl'>Search movies</Text>
      <p>Pesquise um filme no banco de dados do Internet Movie Database</p>
      <p>Veja as informações principais de um filme e adicione-o à lista de favoritos </p>
      <br/>
      <Text fontSize='2xl'>Favorite movies (curatory)</Text>
      <p>Pesquise filmes favoritos e escute a playlist do filme através do Spotify</p>
      <br/>
      {/* <Text fontSize='2xl'>Resenhas</Text>
      <p>Escreva uma resenha para um filme assistido e leia resenhas autorais ou geradas por GenAI</p> */}

    </>
  )
}

export default DashboardPage;
