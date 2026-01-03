import { theme } from '@chakra-ui/react';
import styled from 'styled-components';

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  margin-bottom: 16px;
  justify-content: center;

  @media (max-width: ${theme.breakpoints.lg}) {
    flex-direction: column;
  }
`;

export const SearchInput = styled.input`
  @media (max-width: 1024px) {
    height: 40px !important;
  }
    border-radius: 4px;
    font-size: 16px;
    font-weight: 500;
    color: grey;
    padding: 0 10px;
    background-color: #f5f5f5;
    width: 100%;
    outline: none;
    &:focus {
      border: 1px solid #667eea;
      box-shadow: 0 0 0 1px #667eea;
    }
`;
