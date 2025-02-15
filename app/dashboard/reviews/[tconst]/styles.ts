import styled from 'styled-components';

export const Container = styled.div`
  max-width: 4xl;
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

export const ContentColumn = styled.div`
  width: 62%;
  padding-right: 1rem;

  @media (max-width: 1024px) {
    width: 100%;
    padding-right: 0;
  }
`;

export const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ImageColumn = styled.div`
  width: 36%;
  padding-left: 1rem;

  img {
    margin-bottom: 30px;
    margin-top: 30px;
  }

  @media (max-width: 1024px) {
    width: 100%;
    padding-left: 0;
  }
`;

export const SectionContainer = styled.div`
  margin-bottom: 2rem;
`;

export const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

export const SectionContent = styled.div`
  white-space: pre-wrap;
  color: #718096;
  line-height: 1.625;
`;
