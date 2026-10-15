import { FaEdit } from 'react-icons/fa';

import { JOIN_LIST, NOT_AVAILABLE, NOT_AVAILABLE_LABEL } from '../../../../../formatter';
import Button from '../../../../../ui/Button';
import Card from '../../../../../ui/Card';
import { pirateBaySearchUrl } from '../../../../../util/url';
import { MovieDetailsItem } from '../../../types';
import * as S from '../../styles';
import FavoriteTag from '../FavoriteTag';

interface MovieInfoCardProps {
  data: MovieDetailsItem;
  existingKeywords: string[];
  onEditClick?: () => void;
  onKeywordClick: (keyword: string) => void;
  onKeywordDelete: (keyword: string) => void;
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
  existingKeywords,
  onEditClick,
  onKeywordClick,
  onKeywordDelete,
}: MovieInfoCardProps) {
  return (
    <Card
      title={data.primaryTitle}
      actions={
        onEditClick && (
          <Button iconLeft={FaEdit} size='small' onClick={onEditClick}>
            Editar
          </Button>
        )
      }
    >
      <S.InfoGrid>
        <S.Item>
          <S.Label>Diretor</S.Label>
          <S.Value>
            {data.director ? (
              <FavoriteTag
                existingItems={existingKeywords}
                items={[data.director]}
                onItemClick={onKeywordClick}
                onItemDelete={onKeywordDelete}
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
      </S.InfoGrid>

      <S.SynopsisSection>
        <S.Label>Sinopse</S.Label>
        <S.SynopsisText>{NOT_AVAILABLE(data.plot)}</S.SynopsisText>
      </S.SynopsisSection>

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
