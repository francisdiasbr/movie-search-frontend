import * as S from '../../styles';

interface LinksCardProps {
  data: any;
}

export default function LinksCard({ data }: LinksCardProps) {
  return (
    <S.Card>
      <S.CardHeader>
        <S.CardTitle>Links</S.CardTitle>
      </S.CardHeader>
      
      <S.CardBody>
        <S.LinksGrid>
          {data.wiki && (
            <S.LinkItem>
              <S.LinkLabel>Wiki</S.LinkLabel>
              <S.LinkValue>
                <a
                  href={data.wiki}
                  target='_blank'
                  rel='noopener noreferrer'
                  style={{ textDecoration: 'underline', color: 'blue' }}
                >
                  {data.wiki}
                </a>
              </S.LinkValue>
            </S.LinkItem>
          )}
          
          {Array.isArray(data.references) && data.references.length > 0 && (
            <S.LinkItem>
              <S.LinkLabel>Referências</S.LinkLabel>
              <S.LinkValue>
                <ol style={{ marginLeft: '20px', paddingBottom: '10px' }}>
                  {data.references.map((reference: string, index: number) => (
                    <li key={index}>
                      <a
                        href={reference}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'blue', textDecoration: 'underline' }}
                      >
                        {reference}
                      </a>
                    </li>
                  ))}
                </ol>
              </S.LinkValue>
            </S.LinkItem>
          )}
        </S.LinksGrid>
      </S.CardBody>
    </S.Card>
  );
}
