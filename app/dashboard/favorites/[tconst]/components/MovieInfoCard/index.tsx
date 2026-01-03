import { Button } from '@chakra-ui/react';
import React from 'react';

import FavoriteTag from '../FavoriteTag';
import * as S from './styles';

interface MovieInfoCardProps {
  data: any;
  existingKeywords: string[];
  onKeywordClick: (keyword: string) => void;
  onKeywordDelete: (keyword: string) => void;
  onEditClick?: () => void;
}

export default function MovieInfoCard({ 
  data, 
  existingKeywords, 
  onKeywordClick, 
  onKeywordDelete,
  onEditClick 
}: MovieInfoCardProps) {
  return (
    <S.Card>
      <S.CardHeader>
        <S.MovieTitle>{data.primaryTitle}</S.MovieTitle>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {onEditClick && (
            <Button
              size="sm"
              variant="outline"
              onClick={onEditClick}
            >
              Editar
            </Button>
          )}
        </div>
      </S.CardHeader>

      <S.CardBody>
        <S.InfoGrid>
          <S.InfoItem>
            <S.InfoLabel>Diretor</S.InfoLabel>
            <S.InfoValue>
              {data.director ? (
                <FavoriteTag
                  items={[data.director]}
                  existingItems={existingKeywords}
                  onItemClick={onKeywordClick}
                  onItemDelete={onKeywordDelete}
                />
              ) : 'N/A'}
            </S.InfoValue>
          </S.InfoItem>

          <S.InfoItem>
            <S.InfoLabel>Roteiristas</S.InfoLabel>
            <S.InfoValue>
              {data.writers && data.writers.length > 0 ? data.writers.join(', ') : 'N/A'}
            </S.InfoValue>
          </S.InfoItem>

          <S.InfoItem>
            <S.InfoLabel>Stars</S.InfoLabel>
            <S.InfoValue>{data.stars?.join(', ') || 'N/A'}</S.InfoValue>
          </S.InfoItem>

          <S.InfoItem>
            <S.InfoLabel>Ano</S.InfoLabel>
            <S.InfoValue>{data.startYear?.toString() || 'N/A'}</S.InfoValue>
          </S.InfoItem>

          <S.InfoItem>
            <S.InfoLabel>País</S.InfoLabel>
            <S.InfoValue>{data.country || 'N/A'}</S.InfoValue>
          </S.InfoItem>

          <S.InfoItem>
            <S.InfoLabel>Gêneros</S.InfoLabel>
            <S.InfoValue>{data.genres?.join(', ') || 'N/A'}</S.InfoValue>
          </S.InfoItem>
        </S.InfoGrid>

        <S.SynopsisSection>
          <S.InfoLabel>Sinopse</S.InfoLabel>
          <S.SynopsisText>{data.plot || 'N/A'}</S.SynopsisText>
        </S.SynopsisSection>

        <S.ActionsSection>
          {data.subtitle_url && (
            <Button
              as="a"
              href={encodeURI(data.subtitle_url)}
              target="_blank"
              rel="noopener noreferrer"
              size="sm"
            >
              Baixar Legendas
            </Button>
          )}
          
          {data.magnet_link && (
            <Button
              as="a"
              href={data.magnet_link}
              target="_blank"
              rel="noopener noreferrer"
              size="sm"
            >
              Baixar Torrent
            </Button>
          )}
        </S.ActionsSection>
      </S.CardBody>
    </S.Card>
  );
}
