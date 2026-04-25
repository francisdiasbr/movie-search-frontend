import styled from 'styled-components';

export const Container = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: row;
  max-width: 4xl;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

export const ContentColumn = styled.div`
  padding-right: 1rem;
  width: 62%;

  @media (max-width: 1024px) {
    width: 100%;
    padding-right: 0;
  }
`;

export const FlexContainer = styled.div`
  align-items: center;
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const ImageColumn = styled.div`
  padding-left: 1rem;
  width: 36%;

  img {
    margin-bottom: 30px;
    margin-top: 30px;
  }

  @media (max-width: 1024px) {
    width: 100%;
    padding-left: 0;
  }
`;

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PageContainer = styled.div`
  align-items: start;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  width: 100%;
`;

export const SectionContainer = styled.div`
  margin-bottom: 2rem;
`;

export const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;
