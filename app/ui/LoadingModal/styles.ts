import styled from 'styled-components';

export const Card = styled.div`
  align-items: center;
  background-color: #fff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 32px;
`;

export const Overlay = styled.div`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  inset: 0;
  justify-content: center;
  position: fixed;
  z-index: 1000;
`;
