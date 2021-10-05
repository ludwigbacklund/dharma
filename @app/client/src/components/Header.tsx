import gql from 'graphql-tag';
import styled from 'styled-components';
import Link from 'next/link';
import Select from 'react-select';

import { useHeaderQuery } from '../generated/graphql';
import { media } from '../utils/styling';
import { isDefined } from '../utils/is-defined';
import { useCurrentUserContext } from '../utils/use-current-user';

const Wrapper = styled.header`
  display: flex;
  justify-content: center;
  min-height: 38px;
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

const StyledSelect = styled(Select)`
  display: inline-block;
  min-width: 100px;
  margin-right: 8px;
`;

const DesktopOnly = styled.span`
  ${media.desktopDown} {
    display: none;
  }
`;

interface UserOption {
  value: number;
  label: string;
}

export const Header = () => {
  const { currentUserId, setCurrentUserId } = useCurrentUserContext();
  const { data } = useHeaderQuery({ variables: { id: currentUserId } });

  const user = data?.user;
  const userOptions: UserOption[] | undefined = data?.users?.nodes
    .filter(isDefined)
    .map((user) => ({ value: user.id, label: user.name }));

  return (
    <Wrapper>
      <InnerWrapper>
        <Link href='/' passHref>
          <TitleAnchor>Dharma</TitleAnchor>
        </Link>
        {user && (
          <span>
            {userOptions && (
              <StyledSelect
                id='user-picker'
                isClearable={false}
                instanceId='users'
                options={userOptions}
                value={userOptions.find((option) => option.value === user.id)}
                onChange={(
                  optionTypedAsUnknownForSomeReasonImTooTiredToUnderstand,
                ) => {
                  const option =
                    optionTypedAsUnknownForSomeReasonImTooTiredToUnderstand as UserOption;
                  setCurrentUserId(option.value);
                }}
              />
            )}{' '}
            <DesktopOnly>{user?.company?.name}</DesktopOnly>
          </span>
        )}
      </InnerWrapper>
    </Wrapper>
  );
};

const HEADER_QUERY = gql`
  query Header($id: Int!) {
    user(id: $id) {
      id
      name
      company {
        id
        name
      }
    }
    users {
      nodes {
        id
        name
      }
    }
  }
`;
