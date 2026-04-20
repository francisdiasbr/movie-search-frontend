import React from 'react';

import FavoriteTag from '../FavoriteTag';
import * as S from './styles';

interface KeywordsCardProps {
  existingKeywords: string[];
  onKeywordClick: (keyword: string) => void;
  onKeywordDelete: (keyword: string) => void;
  plotKeywords: string[];
}

export default function KeywordsCard({
  existingKeywords,
  onKeywordClick,
  onKeywordDelete,
  plotKeywords,
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
            existingItems={existingKeywords}
            items={plotKeywords}
            onItemClick={onKeywordClick}
            onItemDelete={onKeywordDelete}
          />
        </S.Content>
      </S.CardBody>
    </S.Card>
  );
}
