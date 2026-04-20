import React from 'react';

import FavoriteTag from '../FavoriteTag';
import * as S from './styles';

interface MovieInfoCardProps {
  data: any;
  existingKeywords: string[];
  onEditClick?: () => void;
  onKeywordClick: (keyword: string) => void;
  onKeywordDelete: (keyword: string) => void;
}

export default function MovieInfoCard({
  data,
  existingKeywords,
  onEditClick,
  onKeywordClick,
  onKeywordDelete,
}: MovieInfoCardProps) {
  return (
    <S.Card>
      <S.CardHeader>
        <S.MovieTitle>{data.primaryTitle}</S.MovieTitle>
        <div style={{ alignItems: 'center', display: 'flex', gap: '12px' }}>
          {onEditClick && <button onClick={onEditClick}>Editar</button>}
        </div>
      </S.CardHeader>

      <S.CardBody>
        <S.InfoGrid>
          <S.InfoItem>
            <S.InfoLabel>Diretor</S.InfoLabel>
            <S.InfoValue>
              {data.director ? (
                <FavoriteTag
                  existingItems={existingKeywords}
                  items={[data.director]}
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
          {data.magnet_link && (
            <a href={data.magnet_link} rel='noopener noreferrer' style={{ fontSize: '12px', wordBreak: 'break-all' }}>
              {data.magnet_link}
            </a>
          )}
          {data.subtitle_url && (
            <a href={encodeURI(data.subtitle_url)} rel='noopener noreferrer' target='_blank'>
              <button>Baixar Legendas</button>
            </a>
          )}
        </S.ActionsSection>
      </S.CardBody>
    </S.Card>
  );
}
