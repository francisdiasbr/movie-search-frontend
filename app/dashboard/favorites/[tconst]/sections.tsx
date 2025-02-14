import { Tag } from '@chakra-ui/react';
import React from 'react';

import FavoriteTag from './components/FavoriteTag';

interface SectionProps {
  data: any;
  handlers: {
    handleDirectorClick: (director: string) => void;
    handleKeywordClick: (keyword: string) => void;
    handleKeywordDelete: (keyword: string) => void;
    sanitizeTrivia: (trivia: string) => React.ReactNode;
    formatQuote: (quote: string) => React.ReactNode;
  };
  existingKeywords: string[];
  plotKeywords: string[];
}

export const getSections = ({
  data,
  handlers,
  existingKeywords,
  plotKeywords,
}: SectionProps) => {
  const sections = [
    {
      title: 'Título Original',
      content: data.originalTitle || 'N/A',
    },
    {
      title: 'Título Principal',
      content: data.primaryTitle || 'N/A',
    },
    {
      title: 'Diretor',
      content: data.director || 'N/A',
    },
    {
      title: 'Ano',
      content: data.startYear?.toString() || 'N/A',
    },
    {
      title: 'País',
      content: data.country || 'N/A',
    },
    {
      title: 'Gêneros',
      content: data.genres?.join(', ') || 'N/A',
    },
    {
      title: 'Palavras-chave',
      content: plotKeywords?.join(', ') || 'N/A',
    },
    {
      title: 'Trivia',
      content: data.trivia ? handlers.sanitizeTrivia(data.trivia) : 'N/A',
    },
    {
      title: 'Citações',
      content: data.quotes ? handlers.formatQuote(data.quotes) : 'N/A',
    },
    {
      title: 'Stars',
      content: data.stars?.join(', ') || 'Não disponível',
    },
  ];

  return sections;
}; 