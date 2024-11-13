import styled from "styled-components";
import { theme } from "@chakra-ui/react";

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  margin-bottom: 16px;
  justify-content: center;

    @media (max-width: ${theme.breakpoints.lg}) {
    flex-direction: column;
  }
`;
