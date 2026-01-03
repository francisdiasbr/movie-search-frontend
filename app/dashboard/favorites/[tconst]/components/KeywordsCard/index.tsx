import React from 'react';

import FavoriteTag from '../FavoriteTag';
import * as S from './styles';

interface KeywordsCardProps {
  plotKeywords: string[];
  existingKeywords: string[];
  onKeywordClick: (keyword: string) => void;
  onKeywordDelete: (keyword: string) => void;
}

export default function KeywordsCard({ 
  plotKeywords, 
  existingKeywords, 
  onKeywordClick, 
  onKeywordDelete 
}: KeywordsCardProps) {
  if (!plotKeywords || plotKeywords.length === 0) return null;

  return (
    <S.Card>
      <S.CardHeader>
        <S.CardTitle>Palavras-chave</S.CardTitle>
      </S.CardHeader>
      
      <S.CardBody>
        <S.Content>
          <FavoriteTag
            items={plotKeywords}
            existingItems={existingKeywords}
            onItemClick={onKeywordClick}
            onItemDelete={onKeywordDelete}
          />
        </S.Content>
      </S.CardBody>
    </S.Card>
  );
}
