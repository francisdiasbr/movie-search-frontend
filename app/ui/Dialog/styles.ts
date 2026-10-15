import styled from 'styled-components';

export const Header = styled.div`
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral.level9};
  display: flex;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing(2.5)};

  h3 {
    margin: 0;
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  font-size: 1rem;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};

  &:hover {
    background: ${({ theme }) => theme.colors.neutral.level10};
  }
`;

export const Body = styled.div`
  max-height: 75vh;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing(2.5)};
`;

export const Footer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  justify-content: flex-end;
  margin-top: ${({ theme }) => theme.spacing.md};
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xxs};
  margin-bottom: ${({ theme }) => theme.spacing.md};

  label {
    font-size: 0.875rem;
    font-weight: ${({ theme }) => theme.fonts.medium};
  }

  input,
  textarea {
    width: 100%;
  }
`;

export const Row = styled.div`
  align-items: center;
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  input {
    flex: 1;
  }
`;
