import styled from 'styled-components';

export const Container = styled.div`
  max-width: 4xl;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContentColumn = styled.div`
  width: 62%;
  padding-right: 1rem;
`;

export const ImageColumn = styled.div`
  width: 36%;
  padding-left: 1rem;

  img {
    margin-bottom: 30px;
    margin-top: 30px;
    margin-left: 20px;
    margin-right: 20px;
  }
`;

export const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const PageContainer = styled.div`
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 100%;
`;

export const PosterWrapper = styled.div`
  width: 25%;
  margin: 0 auto;
  aspect-ratio: 2 / 3;
  background-color: #f1f5f9;
  border-radius: 0.5rem;
  overflow: hidden;
`;

export const PosterImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const SectionContainer = styled.div`
  margin-bottom: 2rem;
`;

export const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

export const SectionContent = styled.p`
  color: #718096;
  line-height: 1.625;
`;
