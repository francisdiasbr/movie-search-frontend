import styled from 'styled-components';

export const Card = styled.section`
  background: ${({ theme }) => theme.colors.background.surface};
  border: 1px solid ${({ theme }) => theme.colors.neutral.level9};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
`;

export const CardHeader = styled.header`
  align-items: center;
  background: ${({ theme }) => theme.colors.primary.light};
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral.level9};
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing(1.5)} ${({ theme }) => theme.spacing(2.5)};
`;

export const CardTitle = styled.h3`
  align-items: center;
  color: ${({ theme }) => theme.colors.neutral.level2};
  display: flex;
  font-size: 1rem;
  gap: ${({ theme }) => theme.spacing.sm};
  margin: 0;
`;

export const CardBadge = styled.span`
  background: ${({ theme }) => theme.colors.primary.main};
  border-radius: ${({ theme }) => theme.radius.pill};
  color: ${({ theme }) => theme.colors.primary.contrastText};
  font-family: ${({ theme }) => theme.fonts.fontSecondary};
  font-size: 0.7rem;
  font-weight: ${({ theme }) => theme.fonts.bold};
  letter-spacing: 0.5px;
  padding: 2px ${({ theme }) => theme.spacing.sm};
  text-transform: uppercase;
`;

export const CardBody = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spacing(2.5)};
`;

export const CardFooter = styled.footer`
  border-top: 1px solid ${({ theme }) => theme.colors.neutral.level9};
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  justify-content: flex-end;
  padding: ${({ theme }) => theme.spacing(1.5)} ${({ theme }) => theme.spacing(2.5)};
`;
