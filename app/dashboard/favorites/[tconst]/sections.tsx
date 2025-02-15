import { Tag } from '@chakra-ui/react';
import React from 'react';

import FavoriteTag from './components/FavoriteTag';

interface SectionProps {
  data: any;
  handlers: {
    handleDirectorClick: (director: string) => void;
    handleKeywordClick: (keyword: string) => void;
    sanitizeTrivia: (trivia: string) => JSX.Element[];
    formatQuote: (quote: string) => JSX.Element[];
  };
  existingKeywords: string[];
  plotKeywords: string[];
}

export const getSections = ({ data, handlers, existingKeywords, plotKeywords }: SectionProps) => [
  {
    title: 'Título Original',
    content: data.originalTitle || 'N/A',
  },
  {
    title: 'Título Principal',
    content: data.primaryTitle || 'N/A',
  },
  {
    title: 'Assistido',
    content: (
      <Tag colorScheme={data.watched ? 'green' : 'red'}>
        {data.watched ? 'Sim' : 'Não'}
      </Tag>
    ),
  },
  {
    title: 'Magnet Link',
    content: data.magnet_link ? (
      <a
        href={encodeURI(data.magnet_link)}
        onClick={(e) => {
          e.preventDefault();
          window.location.href = data.magnet_link;
        }}
        style={{ color: 'blue', textDecoration: 'underline' }}
      >
        {data.magnet_link}
      </a>
    ) : 'N/A',
  },
  {
    title: 'Legendas',
    content: data.subtitle_url ? (
      <a
        href={encodeURI(data.subtitle_url)}
        onClick={(e) => {
          e.preventDefault();
          window.location.href = data.subtitle_url;
        }}
        style={{ color: 'blue', textDecoration: 'underline' }}
      >
        {data.subtitle_url}
      </a>
    ) : 'N/A',
  },
  {
    title: 'Diretor',
    content: data.director ? (
      <button
        onClick={() => handlers.handleDirectorClick(data.director)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handlers.handleDirectorClick(data.director);
          }
        }}
        style={{
          cursor: 'pointer',
          textDecoration: 'underline',
          color: 'blue',
          background: 'none',
          border: 'none',
          padding: 0,
          font: 'inherit',
        }}
      >
        {data.director}
      </button>
    ) : 'N/A',
  },
  {
    title: 'Roteiristas',
    content: data.writers && data.writers.length > 0 ? data.writers.join(', ') : 'N/A',
  },
  {
    title: 'Stars',
    content: data.stars?.join(', ') || 'N/A',
  },
  {
    title: 'País',
    content: data.country || 'N/A',
  },
  {
    title: 'Ano',
    content: data.startYear?.toString() || 'N/A',
  },
  {
    title: 'Sinopse',
    content: data.plot || 'N/A',
  },
  {
    title: 'Gêneros',
    content: data.genres?.join(', ') || 'N/A',
  },
  {
    title: 'Palavras-chave',
    content: plotKeywords?.length > 0 ? (
      <FavoriteTag
        existingKeywords={existingKeywords}
        keywords={plotKeywords}
        onKeywordClick={handlers.handleKeywordClick}
      />
    ) : 'N/A',
  },
  {
    title: 'Wiki',
    content: data.wiki ? (
      <a
        href={data.wiki}
        target='_blank'
        rel='noopener noreferrer'
        style={{ textDecoration: 'underline', color: 'blue' }}
      >
        {data.wiki}
      </a>
    ) : 'N/A',
  },
  {
    title: 'Trivia',
    content: data.trivia ? handlers.sanitizeTrivia(data.trivia) : 'N/A',
  },
  {
    title: 'Citações',
    content: data.quotes ? handlers.formatQuote(data.quotes) : 'N/A',
  },
]; 