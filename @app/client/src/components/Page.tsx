import styled from 'styled-components';
import { Header } from './Header';

const PageWrapper = styled.div`
  display: flex;
  min-height: 100vh;
`;

const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const Page: React.FC = ({ children }) => {
  return (
    <PageWrapper>
      <MainContent>
        <Header />
        {children}
      </MainContent>
    </PageWrapper>
  );
};
