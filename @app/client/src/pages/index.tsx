import gql from 'graphql-tag';
import styled from 'styled-components';
import Link from 'next/link';

import { Page } from '../components/Page';
import { Section } from '../components/Section';
import { useHomeQuery } from '../generated/graphql';
import { media } from '../utils/styling';
import { withGraphql } from '../utils/with-apollo';
import { Heading } from '../components/Heading';
import {
  AdminModeToggle,
  useAdminModeContext,
} from '../components/AdminModeToggle';
import {
  CompanyLatestOrders,
  UserLatestOrders,
} from '../components/OrdersPreview';
import { useCurrentUserContext } from '../utils/use-current-user';
import { PlusIcon } from '../components/icons/Plus';
import { Dish, DISH_FRAGMENT } from '../modules/index/Dish';

const Content = styled.div`
  display: flex;

  ${media.tabletDown} {
    flex-direction: column;
  }
`;

const Dishes = styled.div`
  display: grid;
  grid-gap: 16px;
  padding: 2px;

  ${media.desktopUp} {
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: minmax(auto, max-content);
    grid-gap: 24px;
  }
`;

const Sidebar = styled.div`
  min-width: 260px;
  margin: 0 0 0 32px;
  padding: 0 16px;

  ${media.tabletDown} {
    margin: 32px 0 0 0;
  }
`;

const AddDishBox = styled.a`
  display: flex;
  width: 100%;
  background: white;
  border-radius: 4px;
  box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em,
    rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: 60px;

  :hover {
    opacity: 0.5;
  }
`;

const AddDishText = styled.span`
  font-size: 20px;
`;

const AddDishPlus = styled(PlusIcon)`
  margin-right: 8px;
  width: 16px;
  height: 16px;
`;

const Home = () => {
  const { currentUserId } = useCurrentUserContext();
  const { data, loading, error } = useHomeQuery({
    variables: { userId: currentUserId },
  });
  const { adminModeEnabled } = useAdminModeContext();

  if (loading) {
    return <Page />;
  }

  const user = data?.user;

  if (error || !user || !user.company) {
    return (
      <Page>
        <Section>
          <Heading>Something went wrong fetching this menu.</Heading>
          <p>Please try again later.</p>
        </Section>
      </Page>
    );
  }

  return (
    <>
      <AdminModeToggle />
      <Page>
        <Section>
          <Heading>
            {user.company.name}
            {user.company.name.endsWith('s') ? "'" : "'s"} menu
          </Heading>
          <Content>
            <Dishes>
              {user.company.dishes.nodes.map((dish, i) => {
                if (!dish) return;

                return (
                  <Dish
                    key={dish.id}
                    dish={dish}
                    // Pre-load the first ten images, lazy-load the rest.
                    preloadImage={i < 10 ? true : false}
                  />
                );
              })}
              {adminModeEnabled && (
                <Link href='/add-dish' passHref>
                  <AddDishBox>
                    <AddDishText>
                      <AddDishPlus />
                      Add Dish
                    </AddDishText>
                  </AddDishBox>
                </Link>
              )}
            </Dishes>

            <Sidebar>
              {adminModeEnabled ? (
                <CompanyLatestOrders />
              ) : (
                <UserLatestOrders />
              )}
            </Sidebar>
          </Content>
        </Section>
      </Page>
    </>
  );
};

const HOME_QUERY = gql`
  query Home($userId: Int!) {
    user(id: $userId) {
      id
      name
      company {
        id
        name
        dishes {
          nodes {
            ...DishFields
          }
        }
      }
    }
  }
  ${DISH_FRAGMENT}
`;

const ORDER_DISH_MUTATION = gql`
  mutation OrderDish($userId: Int!, $dishId: Int!) {
    createOrder(input: { order: { userId: $userId, dishId: $dishId } }) {
      user {
        id
        orders(orderBy: CREATED_AT_DESC, first: 10) {
          nodes {
            dishId
            userId
          }
        }
        company {
          id
          orders(orderBy: CREATED_AT_DESC, first: 10) {
            nodes {
              dishId
              userId
            }
          }
        }
      }
    }
  }
`;

export default withGraphql(Home, { ssr: true });
