import { ReactNode } from 'react';

import * as S from './styles';

interface PageHeaderProps {
  actions?: ReactNode;
  // Rendered above the title (the GoBack button, for instance).
  children?: ReactNode;
  description?: ReactNode;
  title: ReactNode;
}

const PageHeader = ({ actions, children, description, title }: PageHeaderProps) => (
  <S.Header>
    <S.TitleGroup>
      {children}
      <h1>{title}</h1>
      {description && <S.Description>{description}</S.Description>}
    </S.TitleGroup>
    {actions && <S.Actions>{actions}</S.Actions>}
  </S.Header>
);

export default PageHeader;
