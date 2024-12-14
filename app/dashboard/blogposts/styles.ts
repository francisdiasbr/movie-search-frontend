import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;
`;

export const NoPostsMessage = styled.p`
  text-align: center;
  color: gray;
  margin-top: 16px;
`;

export const PostsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
  margin-top: 16px;
`;

export const StyledCard = styled.div`
  cursor: pointer;
  transition: background-color 0.3s;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  &:hover {
    background-color: #f5f5f5;
  }
`;

export const CardContent = styled.div`
  padding: 16px;
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;

  img {
    border-radius: 50%;
    width: 40px;
    height: 40px;
  }

  h3 {
    font-size: 1.2rem;
    font-weight: 600;
    margin: 0;
  }
`;

export const CardDate = styled.p`
  text-align: right;
  color: #757575;
  font-size: 0.9rem;
`;
