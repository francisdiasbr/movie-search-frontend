import React from 'react';

import GenericCard from '../GenericCard';
import * as S from './styles';

type MovieCardDetailsProps = {
  quote: string;
  wiki: string;
};

const MovieCardDetails: React.FC<MovieCardDetailsProps> = ({ quote, wiki }) => {
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
                  )
              : 'Quote not available'}
          </td>
        </div>
      );
    });
  };

  return (
    <GenericCard>
      <S.LineInfo>Quote {formatQuote(quote)}</S.LineInfo>
      <S.LineInfo>
        <a href={wiki} rel='noopener noreferrer' target='_blank'>
          {wiki}
        </a>
      </S.LineInfo>
    </GenericCard>
  );
};

export default MovieCardDetails;
