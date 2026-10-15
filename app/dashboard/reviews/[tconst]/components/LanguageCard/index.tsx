import Card from '../../../../../ui/Card';
import * as S from './styles';

interface LanguageCardProps {
  badge: string;
  editing: boolean;
  onChange: (value: string) => void;
  text?: string;
  title: string;
  value: string;
}

// One language of the review: shows the text, or the textarea while editing.
const LanguageCard = ({ badge, editing, onChange, text, title, value }: LanguageCardProps) => (
  <Card badge={badge} title={title}>
    {editing ? (
      <S.Textarea value={value} onChange={e => onChange(e.target.value)} />
    ) : text ? (
      <S.Text>{text}</S.Text>
    ) : (
      <S.EmptyText>Sem texto neste idioma.</S.EmptyText>
    )}
  </Card>
);

export default LanguageCard;
