import { ReactNode } from 'react';

import * as S from './styles';

interface CardProps {
  actions?: ReactNode;
  badge?: string;
  children: ReactNode;
  className?: string;
  footer?: ReactNode;
  title?: ReactNode;
}

const Card = ({ actions, badge, children, className, footer, title }: CardProps) => (
  <S.Card className={className}>
    {(title || actions) && (
      <S.CardHeader>
        <S.CardTitle>
          {badge && <S.CardBadge>{badge}</S.CardBadge>}
          {title}
        </S.CardTitle>
        {actions && <div>{actions}</div>}
      </S.CardHeader>
    )}
    <S.CardBody>{children}</S.CardBody>
    {footer && <S.CardFooter>{footer}</S.CardFooter>}
  </S.Card>
);

export default Card;
