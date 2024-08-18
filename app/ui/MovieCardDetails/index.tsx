import React from 'react';
import * as S from './styles';

type MovieCardDetailsProps = {
  primaryTitle: string;
  tconst: string;
  startYear: string;
  averageRating: number;
  numVotes: number;
  plot: string;
  quote: string;
  spotifyUrl: string;
  wiki: string;
};

const MovieCardDetails: React.FC<MovieCardDetailsProps> = ({
  primaryTitle,
  tconst,
  startYear,
  averageRating,
  numVotes,
  plot,
  quote,
  spotifyUrl,
  wiki,
}) => {

  const spotifyId = spotifyUrl.split('/').pop();

  const formatQuote = (quote: string) => {
    const lines = quote.split(/(?=\b[A-Z][a-z]*\s[A-Z][a-z]*\s*:)/);

    return lines.map((line, index) => {
      const [character, dialogue] = line.split(/:\s(.+)/);

      return (
        <div key={index} style={{ marginBottom: '10px' }}>
          <strong>{character}:</strong>
          <span style={{ display: 'block', marginLeft: '20px' }}>
            {dialogue.split(/(\[.*?\])/g).map((part, i) =>
              part.startsWith('[') ? <em key={i}>{part}</em> : part
            )}
          </span>
        </div>
      );
    });
  };

  return (
    <S.Container>
      <S.PageTitle>Detalhes do Filme</S.PageTitle>
      <S.LineInfo>Título: {primaryTitle}</S.LineInfo>
      <S.LineInfo>ID do filme: {tconst}</S.LineInfo>
      <S.LineInfo>Ano: {startYear}</S.LineInfo>
      <S.LineInfo>Avaliação: {averageRating}</S.LineInfo>
      <S.LineInfo>Votos: {numVotes}</S.LineInfo>
      <S.LineInfo>Sinopse: {plot}</S.LineInfo>
      <S.LineInfo>Citação: {formatQuote(quote)}</S.LineInfo>
      <S.LineInfo>
        <a href={wiki} target="_blank" rel="noopener noreferrer">
          {wiki}
        </a>
      </S.LineInfo>
      <iframe
        src={`https://open.spotify.com/embed/album/${spotifyId}`}
        width="100%"
        height="300"
        style={{ paddingTop: '4px', display: 'block', border: 'none' }}
        allow="encrypted-media"
        allowTransparency={true}
      />
    </S.Container>
  );
};

export default MovieCardDetails;
