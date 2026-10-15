import styled from 'styled-components';

export const Text = styled.p`
  color: ${({ theme }) => theme.colors.neutral.level2};
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
  white-space: pre-line;
`;

export const Textarea = styled.textarea`
  font-size: 1rem;
  line-height: 1.6;
  min-height: 320px;
  resize: vertical;
  width: 100%;
`;

export const EmptyText = styled.p`
  color: ${({ theme }) => theme.colors.neutral.level5};
  font-style: italic;
  margin: 0;
`;
