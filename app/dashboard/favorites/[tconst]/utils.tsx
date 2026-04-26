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
      <div key={idx++} style={{ marginBottom: 8, display: 'flex', alignItems: 'flex-start' }}>
        <span style={{ fontWeight: 600, marginRight: 6, color: '#6B46C1', flexShrink: 0 }}>{character}:</span>
        <span style={{ fontStyle: 'italic', color: '#222' }}>{speech}</span>
      </div>
    );
  }

  if (elements.length === 0) {
    return [<div key={0} style={{ marginBottom: 8, color: '#444' }}>{quote}</div>];
  }

  return elements;
}
