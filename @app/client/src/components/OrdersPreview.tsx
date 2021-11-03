import gql from 'graphql-tag';
import styled, { css } from 'styled-components';
import Image from 'next/image';
import {
  OrderPreviewFragment,
  useCompanyOrdersQuery,
  useUserOrdersQuery,
} from '../generated/graphql';
import { isDefined } from '../utils/is-defined';
import { formatDistance } from 'date-fns';
import { useCurrentUserContext } from '../utils/use-current-user';

const Heading = styled.span`
  display: block;
  font-size: 20px;
  margin-bottom: 16px;
`;

type OrderProps = {
  animate: boolean;
};

const Order = styled.div<OrderProps>`
  position: relative;
  height: 100%;
  margin-bottom: 16px;
  padding: 8px 16px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;

  ${({ animate }) =>
    animate &&
    css`
      animation-duration: 500ms;
      animation-name: slidein;
    `}

  @keyframes slidein {
    from {
      top: -20px;
      opacity: 0;
    }

    to {
      top: 0px;
      opacity: 1;
    }
  }
`;

const OrderText = styled.p`
  margin: 0;
  line-height: 20px;
`;

const OrderImageWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 33%;
  overflow: hidden;
  z-index: -1;

  :after {
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 1),
      rgba(255, 255, 255, 0)
    );
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    content: ' ';
    z-index: 1;
  }
`;

const OrderImage = styled(Image)`
  opacity: 0.5;
  z-index: -1;
`;

const OrderTime = styled.span`
  font-size: 12px;
`;

interface Props {
  orders: OrderPreviewFragment[];
  animateLatestOrder: boolean;
  customName?: string;
}

const OrdersPreview = ({ orders, animateLatestOrder, customName }: Props) => {
  if (orders.length === 0) {
    return <span>No orders placed yet</span>;
  }

  return (
    <>
      {orders.map((order, i) => {
        const orderTime = formatDistance(
          new Date(order.createdAt),
          new Date(),
          {
            addSuffix: true,
          },
        );

        return (
          <Order
            animate={animateLatestOrder && i === 0}
            key={`${order.dishId}-${order.userId}-${order.createdAt}`}
          >
            <OrderText>
              {customName ? customName : order.user?.name} ordered{' '}
              {order.dish?.name}
            </OrderText>
            <OrderTime>{orderTime}</OrderTime>
            {order.dish?.imageUrl && (
              <OrderImageWrapper>
                <OrderImage
                  src={order.dish?.imageUrl}
                  layout='responsive'
                  width='100%'
                  height='100%'
                  objectFit='cover'
                />
              </OrderImageWrapper>
            )}
          </Order>
        );
      })}
    </>
  );
};

export const UserLatestOrders = () => {
  const { currentUserId } = useCurrentUserContext();
  const { data, previousData } = useUserOrdersQuery({
    variables: { userId: currentUserId },
  });
  if (!data?.user) return null;

  // Only animate orders that were just placed, not when switching between users or loading the page for the first time.
  const animateNewOrders =
    previousData !== undefined && data?.user?.id === previousData?.user?.id;

  return (
    <div>
      <Heading>Your orders</Heading>
      <OrdersPreview
        customName='You'
        orders={data.user.orders.nodes.filter(isDefined)}
        animateLatestOrder={animateNewOrders}
      />
    </div>
  );
};

export const CompanyLatestOrders = () => {
  const { currentUserId } = useCurrentUserContext();
  const { data, previousData } = useCompanyOrdersQuery({
    variables: { userId: currentUserId },
  });
  if (!data?.user?.company) return null;

  // Only animate orders that were just placed, not when switching between users or loading the page for the first time.
  const animateNewOrders =
    previousData !== undefined && data?.user?.id === previousData?.user?.id;

  return (
    <div>
      <Heading>Latest orders</Heading>
      <OrdersPreview
        orders={data.user.company.orders.nodes.filter(isDefined)}
        animateLatestOrder={animateNewOrders}
      />
    </div>
  );
};

const ORDERS_PREVIEW_FRAGMENT = gql`
  fragment OrderPreview on Order {
    dishId
    userId
    createdAt
    dish {
      id
      name
      imageUrl
    }
    user {
      id
      name
    }
  }
`;

const USER_ORDERS_QUERY = gql`
  query UserOrders($userId: Int!) {
    user(id: $userId) {
      id
      orders(orderBy: CREATED_AT_DESC, first: 10) {
        nodes {
          ...OrderPreview
        }
      }
    }
  }
  ${ORDERS_PREVIEW_FRAGMENT}
`;

const COMPANY_ORDERS_QUERY = gql`
  query CompanyOrders($userId: Int!) {
    user(id: $userId) {
      id
      company {
        id
        orders(orderBy: CREATED_AT_DESC, first: 10) {
          nodes {
            ...OrderPreview
          }
        }
      }
    }
  }
  ${ORDERS_PREVIEW_FRAGMENT}
`;
