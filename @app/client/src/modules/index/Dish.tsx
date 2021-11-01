import gql from 'graphql-tag';
import { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Image from 'next/image';

import { useAdminModeContext } from '../../components/AdminModeToggle';
import {
  DishFieldsFragment,
  useOrderDishMutation,
} from '../../generated/graphql';
import { useCurrentUserContext } from '../../utils/use-current-user';

const Box = styled.div`
  display: flex;
  width: 100%;
  background: white;
  border-radius: 4px;
  box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em,
    rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
`;

const ImageWrapper = styled.div`
  min-width: 100px;
  min-height: 100px;
  position: relative;
`;

const DishImage = styled(Image)`
  border-radius: 4px 0 0 4px;
`;

const Info = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
`;

const Name = styled.h2`
  font-size: 24px;
  margin: 0;
  font-weight: bold;
`;

const Description = styled.p`
  margin: 8px 0 0 0;
`;

const Price = styled.h3`
  margin: 0;
`;

const BottomWrapper = styled.div`
  margin: 16px 0 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Anchor = styled.a<{ color?: string }>`
  background: white;
  border-radius: 4px;
  padding: 4px;
  cursor: pointer;
  border: 1px solid ${({ color }) => color};
  color: ${({ color }) => color};

  :hover :enabled {
    opacity: 0.5;
  }

  :disabled {
    cursor: default;
  }
`;

Anchor.defaultProps = {
  color: '#3a3a3a',
};

interface Props {
  dish: DishFieldsFragment;
  preloadImage: boolean;
}

export const Dish = ({ dish, preloadImage }: Props) => {
  const { currentUserId } = useCurrentUserContext();
  const { adminModeEnabled } = useAdminModeContext();
  const [orderPlacedRecently, setOrderPlacedRecently] = useState(false);

  const [orderDish] = useOrderDishMutation({
    onCompleted: () => {
      setOrderPlacedRecently(true);
      setTimeout(() => {
        setOrderPlacedRecently(false);
      }, 5000);
    },
  });

  return (
    <Box>
      {dish.imageUrl && (
        <ImageWrapper>
          <DishImage
            src={dish.imageUrl}
            layout='fill'
            objectFit='cover'
            priority={preloadImage}
          />
        </ImageWrapper>
      )}
      <Info>
        <div>
          <Name>{dish.name}</Name>
          {dish.description && <Description>{dish.description}</Description>}
        </div>
        <BottomWrapper>
          <Price>{dish.priceInSek.toLocaleString()} kr</Price>
          {adminModeEnabled ? (
            <Link href={`/edit-dish/${dish.id}`} passHref>
              <Anchor>Edit dish</Anchor>
            </Link>
          ) : (
            <Anchor
              as='button'
              color={orderPlacedRecently ? '#4caf50' : '#3a3a3a'}
              disabled={orderPlacedRecently}
              onClick={async () => {
                await orderDish({
                  variables: {
                    userId: currentUserId,
                    dishId: dish.id,
                  },
                });
                setOrderPlacedRecently(true);
                setTimeout(() => {
                  setOrderPlacedRecently(false);
                }, 5000);
              }}
            >
              {orderPlacedRecently ? 'Order placed!' : 'Order'}
            </Anchor>
          )}
        </BottomWrapper>
      </Info>
    </Box>
  );
};

export const DISH_FRAGMENT = gql`
  fragment DishFields on Dish {
    id
    name
    imageUrl
    description
    priceInSek
  }
`;
