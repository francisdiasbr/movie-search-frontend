import React from 'react';

import * as S from './styles';

type MovieCardDetailsProps = {
  averageRating: number;
  numVotes: number;
  plot: string;
  primaryTitle: string;
  quote: string;
  spotifyUrl: string;
  startYear: string;
  tconst: string;
  wiki: string;
};

const MovieCardDetails: React.FC<MovieCardDetailsProps> = ({
  averageRating,
  numVotes,
  plot,
  primaryTitle,
  quote,
  spotifyUrl,
  startYear,
  tconst,
  wiki,
}) => {
  const spotifyId = spotifyUrl ? spotifyUrl.split('/').pop() : null;

  const formatQuote = (quote: string) => {
    const lines = quote.split(/(?=\b[A-Z][a-z]*\s[A-Z][a-z]*\s*:)/);

    return lines.map((line, index) => {
      const [character, dialogue] = line.split(/:\s(.+)/);

      return (
        <div key={index} style={{ marginBottom: '10px' }}>
          <strong>{character}:</strong>
          <span style={{ display: 'block', marginLeft: '20px' }}>
            {dialogue
              ? dialogue
                .split(/(\[.*?\])/g)
                .map((part, i) =>
                  part.startsWith('[') ? <em key={i}>{part}</em> : part
                ) : 'Quote not available'
            }
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
        <a href={wiki} rel='noopener noreferrer' target='_blank'>
          {wiki}
        </a>
      </S.LineInfo>
      <iframe
        allow='encrypted-media'
        height='300'
        src={`https://open.spotify.com/embed/album/${spotifyId}`}
        style={{ border: 'none', display: 'block', paddingTop: '4px' }}
        title='Spotify player'
        width='100%'
      />
    </S.Container>
  );
};

export default MovieCardDetails;
