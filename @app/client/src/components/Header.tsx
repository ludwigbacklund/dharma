import gql from 'graphql-tag';
import styled from 'styled-components';
import Link from 'next/link';

import { useHeaderQuery } from '../generated/graphql';
import { media } from '../utils/styling';

const Wrapper = styled.header`
  display: flex;
  justify-content: center;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  padding: 16px 32px;

  ${media.tabletDown} {
    padding: 16px;
  }
`;

const InnerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  max-width: 1152px;
`;

const TitleAnchor = styled.a`
  font-size: 20px;
  cursor: pointer;

  :hover {
    opacity: 0.5;
  }
`;

export const Header = () => {
  const { data } = useHeaderQuery();

  const user = data?.user;

  return (
    <Wrapper>
      <InnerWrapper>
        <Link href='/'>
          <TitleAnchor>Dharma</TitleAnchor>
        </Link>
        {user && (
          <span>
            {user?.name} - {user?.company?.name}
          </span>
        )}
      </InnerWrapper>
    </Wrapper>
  );
};

const HEADER_QUERY = gql`
  query Header {
    user(id: 1) {
      id
      name
      company {
        id
        name
      }
    }
  }
`;
