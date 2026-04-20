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
    padding-right: 0;
    width: 100%;
  }
`;

export const EditButton = styled.button`
  background: #007bff;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  padding: 8px 16px;

  &:hover {
    background: #0056b3;
  }
`;

export const FlexContainer = styled.div`
  align-items: center;
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const Header = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const ImageColumn = styled.div`
  padding-left: 1rem;
  width: 36%;

  img {
    margin-bottom: 30px;
    margin-top: 30px;
  }

  @media (max-width: 1024px) {
    padding-left: 0;
    width: 100%;
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

export const SectionContent = styled.p`
  color: #718096;
  line-height: 1.625;
`;

export const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;
