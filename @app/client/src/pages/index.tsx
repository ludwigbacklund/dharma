import gql from 'graphql-tag';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';

import { Page } from '../components/Page';
import { Section } from '../components/Section';
import { useHomeQuery } from '../generated/graphql';
import { media } from '../utils/styling';
import { withGraphql } from '../utils/with-apollo';
import { Heading } from '../components/Heading';

const Dishes = styled.div`
  display: grid;
  grid-gap: 16px;

  ${media.tabletUp} {
    grid-template-columns: 1fr 1fr;
    grid-gap: 24px;
  }
`;

const Box = styled.div`
  display: flex;
  width: 100%;
  background: white;
  border-radius: 4px;
  box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em,
    rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
`;

const ImageWrapper = styled.div`
  min-width: 150px;
  min-height: 125px;
  position: relative;
`;

const DishImage = styled(Image)`
  border-radius: 4px 0 0 4px;
`;

const DishInfo = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
`;

const DishName = styled.h2`
  font-size: 24px;
  margin: 0;
  font-weight: bold;
`;

const DishDescription = styled.p`
  margin: 8px 0 0 0;
`;

const DishPrice = styled.h3`
  margin: 0;
`;

const DishBottomWrapper = styled.div`
  margin: 16px 0 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const EditDishAnchor = styled.a`
  border: 1px solid #3a3a3a;
  background: white;
  border-radius: 4px;
  padding: 4px;
  cursor: pointer;

  :hover {
    opacity: 0.5;
  }
`;

const AddDishBox = styled(Box).attrs({ as: 'a' })`
  align-items: center;
  justify-content: center;
  cursor: pointer;
  min-height: 125px;

  :hover {
    opacity: 0.5;
  }
`;

const AddDishText = styled.span`
  font-size: 32px;
`;

const Home = () => {
  const { data, loading, error } = useHomeQuery();

  if (loading) {
    return null;
  }

  const user = data?.user;

  if (error || !user || !user.company) {
    return <p>Something went wrong</p>;
  }

  return (
    <Page>
      <Section>
        <Heading>
          {user.company.name}
          {user.company.name.endsWith('s') ? "'" : "'s"} menu
        </Heading>
        <Dishes>
          {user.company.dishes.nodes.map((dish, i) => {
            if (!dish) return;

            return (
              <Box key={dish.id}>
                {dish.imageUrl && (
                  <ImageWrapper>
                    <DishImage
                      src={dish.imageUrl}
                      layout='fill'
                      objectFit='cover'
                      // Pre-load the first ten images, lazy-load the rest.
                      priority={i < 10 ? true : false}
                    />
                  </ImageWrapper>
                )}
                <DishInfo>
                  <div>
                    <DishName>{dish.name}</DishName>
                    {dish.description && (
                      <DishDescription>{dish.description}</DishDescription>
                    )}
                  </div>
                  <DishBottomWrapper>
                    <DishPrice>{dish.priceInSek.toLocaleString()} kr</DishPrice>
                    <Link href={`/edit-dish/${dish.id}`}>
                      <EditDishAnchor>Edit dish</EditDishAnchor>
                    </Link>
                  </DishBottomWrapper>
                </DishInfo>
              </Box>
            );
          })}
          <Link href='/add-dish'>
            <AddDishBox>
              <AddDishText>Add Dish</AddDishText>
            </AddDishBox>
          </Link>
        </Dishes>
      </Section>
    </Page>
  );
};

const HOME_QUERY = gql`
  query Home {
    user(id: 1) {
      id
      name
      company {
        id
        name
        dishes {
          nodes {
            id
            name
            imageUrl
            description
            priceInSek
          }
        }
      }
    }
  }
`;

export default withGraphql(Home, { ssr: true });
