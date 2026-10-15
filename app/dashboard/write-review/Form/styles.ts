import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  max-width: 900px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xxs};

  label {
    font-size: 0.875rem;
    font-weight: ${({ theme }) => theme.fonts.medium};
  }
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
`;
