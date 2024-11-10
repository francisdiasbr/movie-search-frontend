import styled from "styled-components";

export const Container = styled.div`
  align-items: start;
  // background-color: gray;
  border: 1px solid;
  border-radius: 20px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  height: 300px;
  padding: 16px;
  overflow: auto;
  width: 100%;
  &: hover {
    background-color: #f5f5f5;
  }
`;

