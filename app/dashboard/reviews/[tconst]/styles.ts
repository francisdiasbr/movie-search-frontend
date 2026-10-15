import styled from 'styled-components';

export const HiddenFileInput = styled.input`
  display: none;
`;

export const ImageActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  position: absolute;
  right: ${({ theme }) => theme.spacing.sm};
  top: ${({ theme }) => theme.spacing.sm};
`;

export const ImageWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(2.5)};
  position: relative;
`;

export const ReviewImage = styled.img`
  height: auto;
  width: 100%;
`;
