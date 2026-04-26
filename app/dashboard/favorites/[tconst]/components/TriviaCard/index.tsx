import * as S from '../../styles';

interface TriviaCardProps {
  trivia: string;
}

export default function TriviaCard({ trivia }: TriviaCardProps) {
  if (!trivia) return null;

  const sanitizeTrivia = (trivia: string) => {
    return trivia.split('\n\n').map((item, index) => {
      return (
        <li key={index} style={{ marginLeft: '20px', paddingBottom: '10px' }}>
          {item}
        </li>
      );
    });
  };

  return (
    <S.Card>
      <S.CardHeader>
        <S.CardTitle>Trivia</S.CardTitle>
      </S.CardHeader>
      
      <S.CardBody>
        <S.Content>
          <ul style={{ margin: 0, padding: 0 }}>{sanitizeTrivia(trivia)}</ul>
        </S.Content>
      </S.CardBody>
    </S.Card>
  );
}
