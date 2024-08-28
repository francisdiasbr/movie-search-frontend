import React from 'react';

import GenericCard from '../GenericCard';
import * as S from './styles';

type MovieCardDetailsProps = {
  primaryTitle: string;
  quote: string;
  startYear: string;
  tconst: string;
  wiki: string;
};

const MovieCardDetails: React.FC<MovieCardDetailsProps> = ({
  primaryTitle,
  quote,
  startYear,
  tconst,
  wiki,
}) => {

  const formatQuote = (quote: string) => {
    const lines = quote.split(/(?=\b[A-Z][a-z]*\s[A-Z][a-z]*\s*:)/);

    return lines.map((line, index) => {
      const [character, dialogue] = line.split(/:\s(.+)/);

      return (
        <div key={index} style={{ marginBottom: '10px' }}>
          <strong>{character}:</strong>
          <td style={{ display: 'block', marginLeft: '20px' }}>
            {dialogue
              ? dialogue
                .split(/(\[.*?\])/g)
                .map((part, i) =>
                  part.startsWith('[') ? <em key={i}>{part}</em> : part
                ) : 'Quote not available'
            }
          </td>
        </div>
      );
    });
  };

  return (
    <GenericCard>
      <S.PageTitle>{primaryTitle}</S.PageTitle>
      <S.LineInfo>{tconst}</S.LineInfo>
      <S.LineInfo>{startYear}</S.LineInfo>
      <S.LineInfo>Citação: {formatQuote(quote)}</S.LineInfo>
      <S.LineInfo>
        <a href={wiki} rel='noopener noreferrer' target='_blank'>
          {wiki}
        </a>
      </S.LineInfo>
      {/* <iframe
        allow='encrypted-media'
        height='300'
        src={`https://open.spotify.com/embed/album/${spotifyId}`}
        style={{ border: 'none', display: 'block', paddingTop: '4px' }}
        title='Spotify player'
        width='100%'
      /> */}
    </GenericCard>
  );
};

export default MovieCardDetails;
