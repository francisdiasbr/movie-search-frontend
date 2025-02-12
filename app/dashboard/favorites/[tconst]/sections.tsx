import { Tag } from '@chakra-ui/react';
import React from 'react';

import FavoriteTag from './components/FavoriteTag';

interface SectionProps {
  data: any;
  handlers: {
    handleDirectorClick: (director: string) => void;
    handleKeywordClick: (keyword: string) => void;
    handleKeywordDelete: (keyword: string) => void;
    sanitizeTrivia: (trivia: string) => JSX.Element[];
    formatQuote: (quote: string) => JSX.Element[];
  };
  existingKeywords: string[];
  plotKeywords: string[];
}

export const getSections = ({ data, handlers, existingKeywords, plotKeywords }: SectionProps) => [
  {
    title: 'Original title',
    content: data.originalTitle,
  },
  {
    title: 'Primary title',
    content: data.primaryTitle,
  },
  {
    title: 'Watched',
    content: (
      <Tag colorScheme={data.watched ? 'green' : 'red'}>
        {data.watched ? 'Sim' : 'Não'}
      </Tag>
    ),
  },
  {
    title: 'Magnet Link',
    content: (
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
    ),
  },
  {
    title: 'Subtitles',
    content: (
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
    ),
  },
  {
    title: 'Director',
    content: (
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
    ),
  },
  {
    title: 'Writers',
    content: data.writers && data.writers.length > 0 ? data.writers.join(', ') : 'N/A',
  },
  {
    title: 'Stars',
    content: data.stars.join(', '),
  },
  {
    title: 'Country',
    content: data.country,
  },
  {
    title: 'Year',
    content: data.startYear,
  },
  {
    title: 'Plot',
    content: data.plot,
  },
  {
    title: 'Genres',
    content: data.genres.join(', '),
  },
  {
    title: 'Plot keywords',
    content: (
      <FavoriteTag
        existingKeywords={existingKeywords}
        keywords={plotKeywords}
        onKeywordClick={handlers.handleKeywordClick}
        onKeywordDelete={handlers.handleKeywordDelete}
      />
    ),
  },
  {
    title: 'Wiki',
    content: (
      <a
        href={data.wiki}
        target='_blank'
        rel='noopener noreferrer'
        style={{ textDecoration: 'underline', color: 'blue' }}
      >
        {data.wiki}
      </a>
    ),
  },
  {
    title: 'Trivia',
    content: <ul>{handlers.sanitizeTrivia(data.trivia)}</ul>,
  },
  {
    title: 'Quote',
    content: handlers.formatQuote(data.quote),
  },
]; 