import { JOIN_LIST, NOT_AVAILABLE, NOT_AVAILABLE_LABEL } from '../../../../../formatter';
import { pirateBaySearchUrl } from '../../../../../util/url';
import { MovieDetailsItem } from '../../../types';
import FavoriteTag from '../FavoriteTag';
import * as S from '../../styles';

interface MovieInfoCardProps {
  data: MovieDetailsItem;
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
              ) : NOT_AVAILABLE_LABEL}
            </S.InfoValue>
          </S.InfoItem>

          <S.InfoItem>
            <S.InfoLabel>Roteiristas</S.InfoLabel>
            <S.InfoValue>
              {JOIN_LIST(data.writers)}
            </S.InfoValue>
          </S.InfoItem>

          <S.InfoItem>
            <S.InfoLabel>Stars</S.InfoLabel>
            <S.InfoValue>{JOIN_LIST(data.stars)}</S.InfoValue>
          </S.InfoItem>

          <S.InfoItem>
            <S.InfoLabel>Ano</S.InfoLabel>
            <S.InfoValue>{NOT_AVAILABLE(data.startYear)}</S.InfoValue>
          </S.InfoItem>

          <S.InfoItem>
            <S.InfoLabel>País</S.InfoLabel>
            <S.InfoValue>{NOT_AVAILABLE(data.country)}</S.InfoValue>
          </S.InfoItem>

          <S.InfoItem>
            <S.InfoLabel>Gêneros</S.InfoLabel>
            <S.InfoValue>{JOIN_LIST(data.genres)}</S.InfoValue>
          </S.InfoItem>
        </S.InfoGrid>

        <S.SynopsisSection>
          <S.InfoLabel>Sinopse</S.InfoLabel>
          <S.SynopsisText>{NOT_AVAILABLE(data.plot)}</S.SynopsisText>
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
          <a
            href={pirateBaySearchUrl(data.primaryTitle)}
            rel='noopener noreferrer'
            target='_blank'
          >
            <button>Baixar Filme</button>
          </a>
        </S.ActionsSection>
      </S.CardBody>
    </S.Card>
  );
}
