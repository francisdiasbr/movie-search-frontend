import * as S from '../../styles';

interface QuotesCardProps {
  quote: string;
}

export default function QuotesCard({ quote }: QuotesCardProps) {
  if (!quote) return null;

  const formatQuote = (quote: string): JSX.Element[] => {
    // Regex para capturar padrões "Nome : Fala" corretamente
    // Captura um nome (começa com maiúscula seguida de letras minúsculas, pode ter espaços, pontos, hífens)
    // seguido de " : " e depois tudo até o próximo "Nome :" ou fim da string
    // Exclui palavras soltas de uma letra como "I" para evitar capturar "I'd" como personagem
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
    
    // Se não encontrou nenhum padrão, retorna o texto original
    if (elements.length === 0) {
      return [<div key={0} style={{ marginBottom: 8, color: '#444' }}>{quote}</div>];
    }
    
    return elements;
  };

  return (
    <S.Card>
      <S.CardHeader>
        <S.CardTitle>Citações</S.CardTitle>
      </S.CardHeader>
      
      <S.CardBody>
        <S.Content>{formatQuote(quote)}</S.Content>
      </S.CardBody>
    </S.Card>
  );
}
