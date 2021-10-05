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

interface Props {
  showHeader?: boolean;
  children: React.ReactNode;
}

export const Page = ({ showHeader = true, children }: Props) => {
  return (
    <PageWrapper>
      <MainContent>
        {showHeader && <Header />}
        {children}
      </MainContent>
    </PageWrapper>
  );
};
