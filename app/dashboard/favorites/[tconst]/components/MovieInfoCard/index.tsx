import { FaEdit } from 'react-icons/fa';

import { JOIN_LIST, NOT_AVAILABLE, NOT_AVAILABLE_LABEL } from '../../../../../formatter';
import Button from '../../../../../ui/Button';
import Card from '../../../../../ui/Card';
import ExternalLink from '../../../../../ui/ExternalLink';
import TagList from '../../../../../ui/TagList';
import { imdbTitleUrl, pirateBaySearchUrl } from '../../../../../util/url';
import { MovieDetailsItem } from '../../../types';
import * as S from '../../styles';
import { sanitizeTrivia } from '../../utils';

interface MovieInfoCardProps {
  data: MovieDetailsItem;
  favoritedKeywords: string[];
  onEditClick?: () => void;
  onKeywordRemove: (keyword: string) => void;
  onKeywordSelect: (keyword: string) => void;
}

const INFO_FIELDS: Array<{ key: 'country' | 'genres' | 'stars' | 'startYear' | 'writers'; label: string }> = [
  { key: 'writers', label: 'Roteiristas' },
  { key: 'stars', label: 'Stars' },
  { key: 'startYear', label: 'Ano' },
  { key: 'country', label: 'País' },
  { key: 'genres', label: 'Gêneros' },
];

const formatField = (value: MovieDetailsItem[(typeof INFO_FIELDS)[number]['key']]) =>
  Array.isArray(value) ? JOIN_LIST(value) : NOT_AVAILABLE(value);

export default function MovieInfoCard({
  data,
  favoritedKeywords,
  onEditClick,
  onKeywordRemove,
  onKeywordSelect,
}: MovieInfoCardProps) {
  const title = (
    <>
      {data.primaryTitle}
      <S.TitleLink>
        <ExternalLink href={data.imdb_url ?? imdbTitleUrl(data.tconst)}>{data.tconst}</ExternalLink>
      </S.TitleLink>
    </>
  );
  const actions = onEditClick && (
    <Button iconLeft={FaEdit} size='small' onClick={onEditClick}>
      Editar
    </Button>
  );

  // With a banner the title and the actions sit over the image instead of
  // in the card header.
  const cover = data.backdrop_url && (
    <S.Hero>
      <S.HeroImage alt={data.primaryTitle} src={data.backdrop_url} />
      <S.HeroContent>
        <S.HeroTitle>{title}</S.HeroTitle>
        {actions}
      </S.HeroContent>
    </S.Hero>
  );

  return (
    <Card actions={cover ? undefined : actions} cover={cover} title={cover ? undefined : title}>
      <S.InfoGrid>
        <S.InfoColumn>
          <S.Item>
            <S.Label>Diretor</S.Label>
            <S.Value>
              {data.director ? (
                <TagList
                  favorited={favoritedKeywords}
                  items={[data.director]}
                  onRemove={onKeywordRemove}
                  onSelect={onKeywordSelect}
                />
              ) : (
                NOT_AVAILABLE_LABEL
              )}
            </S.Value>
          </S.Item>
          {INFO_FIELDS.map(({ key, label }) => (
            <S.Item key={key}>
              <S.Label>{label}</S.Label>
              <S.Value>{formatField(data[key])}</S.Value>
            </S.Item>
          ))}
        </S.InfoColumn>

        <S.Item>
          <S.Label>Sinopse</S.Label>
          <S.SynopsisText>{NOT_AVAILABLE(data.plot)}</S.SynopsisText>
        </S.Item>

        <S.Item>
          <S.Label>Trivia</S.Label>
          {data.trivia ? (
            <S.SynopsisText>
              <S.BulletList>
                {sanitizeTrivia(data.trivia).map(({ key, text }) => (
                  <li key={key}>{text}</li>
                ))}
              </S.BulletList>
            </S.SynopsisText>
          ) : (
            <S.SynopsisText>{NOT_AVAILABLE_LABEL}</S.SynopsisText>
          )}
        </S.Item>
      </S.InfoGrid>

      <S.ActionsSection>
        {data.magnet_link && (
          <S.MagnetLink href={data.magnet_link} rel='noopener noreferrer'>
            {data.magnet_link}
          </S.MagnetLink>
        )}
        {data.subtitle_url && (
          <Button variant='outline' size='small' href={encodeURI(data.subtitle_url)}>
            Baixar Legendas
          </Button>
        )}
        <Button variant='outline' size='small' href={pirateBaySearchUrl(data.primaryTitle)}>
          Baixar Filme
        </Button>
      </S.ActionsSection>
    </Card>
  );
}
