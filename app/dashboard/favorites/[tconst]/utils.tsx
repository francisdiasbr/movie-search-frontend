import * as S from './styles';

export function sanitizeTrivia(trivia: string) {
  return trivia.split('\n\n').map((item, index) => ({
    key: index,
    text: item,
  }));
}

export function formatQuote(quote: string): JSX.Element[] {
  const regex = /([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s*:\s*([^]*?)(?=\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\s*:|$)/g;
  const elements: JSX.Element[] = [];
  let match;
  let idx = 0;

  while ((match = regex.exec(quote)) !== null) {
    const character = match[1].trim();
    const speech = match[2].trim();

    elements.push(
      <S.QuoteLine key={idx++}>
        <S.QuoteCharacter>{character}</S.QuoteCharacter>
        <S.QuoteSpeech>{speech}</S.QuoteSpeech>
      </S.QuoteLine>
    );
  }

  if (elements.length === 0) {
    return [<S.QuotePlain key={0}>{quote}</S.QuotePlain>];
  }

  return elements;
}
