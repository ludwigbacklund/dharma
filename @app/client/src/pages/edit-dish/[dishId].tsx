import gql from 'graphql-tag';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import { Page } from '../../components/Page';
import { Section } from '../../components/Section';
import {
  DishQuery,
  useDishQuery,
  useEditDishMutation,
} from '../../generated/graphql';
import { media } from '../../utils/styling';
import { useNextQueryParam } from '../../utils/use-next-query-param';
import { withGraphql } from '../../utils/with-apollo';
import { Input } from '../../components/Input';
import { useEffect, useState } from 'react';

const BackAnchor = styled.a`
  display: block;
  font-size: 14px;
  margin: 8px 0 4px 0;
  cursor: pointer;

  :hover {
    opacity: 0.5;
  }
`;

const Heading = styled.h1`
  font-size: 24px;
  margin: 0 0 24px 0;

  ${media.tabletDown} {
    margin: 0 0 16px 0;
  }
`;

const Wrapper = styled.div`
  display: flex;

  ${media.tabletDown} {
    flex-direction: column;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  border-radius: 4px;
  box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em,
    rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
  margin-right: 24px;

  ${media.tabletDown} {
    margin-bottom: 16px;
  }
`;

const StyledForm = styled.form`
  flex: 1;
`;

const ImageNotice = styled.span`
  display: block;
  font-size: 14px;
  margin-top: -8px;
  color: #707070;
`;

const SaveButtonInput = styled.input`
  border: 1px solid #3a3a3a;
  background: white;
  border-radius: 4px;
  padding: 4px;
  cursor: pointer;
  margin-top: 8px;

  :hover {
    opacity: 0.5;
  }
`;

const SuccessText = styled.span`
  display: block;
  color: #4caf50;
  margin-top: 8px;
`;

interface FormInputs {
  name: string;
  description?: string | null;
  imageUrl?: string | null;
}

const EditDish = ({ dish }: { dish: DishQuery['dish'] }) => {
  if (!dish) return null;

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<FormInputs>({
    defaultValues: {
      name: dish.name,
      description: dish.description,
      imageUrl: dish.imageUrl,
    },
  });
  const [editDish] = useEditDishMutation();
  const [showSuccessText, setShowSuccessText] = useState(false);

  useEffect(() => {
    if (!showSuccessText) return;

    const timeout = setTimeout(() => setShowSuccessText(false), 5000);
    return () => {
      clearTimeout(timeout);
    };
  });

  const onSubmit = async ({ name, description, imageUrl }: FormInputs) => {
    const result = await editDish({
      variables: { id: dish.id, name, description, imageUrl },
    });

    const updatedDish = result.data?.updateDish?.query?.dish;
    if (!updatedDish) return;
    reset({
      name: updatedDish.name,
      description: updatedDish.description,
      imageUrl: updatedDish.imageUrl,
    });
    setShowSuccessText(true);
  };

  return (
    <Page>
      <Section>
        <Link href='/'>
          <BackAnchor>Back to menu</BackAnchor>
        </Link>
        <Heading>Edit dish</Heading>
        <Wrapper>
          {dish.imageUrl && (
            <ImageWrapper>
              <Image src={dish.imageUrl} layout='fill' objectFit='cover' />
            </ImageWrapper>
          )}
          <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <Input
              {...register('name', { required: 'Name is required' })}
              type='text'
              name='name'
              label='Name'
            />
            <Input
              {...register('description')}
              tag='textarea'
              type='text'
              name='description'
              label='Description'
              optional
            />
            <Input
              {...register('imageUrl')}
              type='text'
              name='imageUrl'
              label='Image URL'
              optional
            />
            <ImageNotice>Please use a images.pexels.com image URL.</ImageNotice>
            {isDirty && <SaveButtonInput type='submit' value='Save' />}
            {showSuccessText && <SuccessText>Dish updated!</SuccessText>}
          </StyledForm>
        </Wrapper>
      </Section>
    </Page>
  );
};

const EditDishPage = () => {
  const dishId = useNextQueryParam('dishId');

  const { data, loading, error } = useDishQuery({
    skip: !dishId,
    variables: { id: parseInt(dishId!, 10) },
  });

  const dish = data?.dish;

  if (loading) {
    return null;
  }

  if (error || !dish) {
    return <p>Something went wrong</p>;
  }

  return <EditDish dish={dish} />;
};

const EDIT_DISH_QUERY = gql`
  query Dish($id: Int!) {
    dish(id: $id) {
      id
      name
      description
      imageUrl
    }
  }
`;

const EDIT_DISH_MUTATION = gql`
  mutation EditDish(
    $id: Int!
    $name: String!
    $description: String
    $imageUrl: String
  ) {
    updateDish(
      input: {
        id: $id
        patch: { name: $name, description: $description, imageUrl: $imageUrl }
      }
    ) {
      query {
        dish(id: $id) {
          id
          name
          description
          imageUrl
        }
      }
    }
  }
`;

export default withGraphql(EditDishPage, { ssr: true });
