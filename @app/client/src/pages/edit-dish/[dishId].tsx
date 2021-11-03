import { useEffect, useState } from 'react';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import { Page } from '../../components/Page';
import { Section } from '../../components/Section';
import {
  DishQuery,
  useDeleteDishMutation,
  useDishQuery,
  useEditDishMutation,
} from '../../generated/graphql';
import { media } from '../../utils/styling';
import { useNextQueryParam } from '../../utils/use-next-query-param';
import { withGraphql } from '../../utils/with-apollo';
import { Input } from '../../components/Input';
import { Heading } from '../../components/Heading';
import { useRouter } from 'next/dist/client/router';

const BackAnchor = styled.a`
  display: block;
  font-size: 14px;
  margin: 8px 0 4px 0;
  cursor: pointer;

  :hover {
    opacity: 0.5;
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
  margin: 0 24px 0 0;

  ${media.tabletDown} {
    margin: 0 0 16px 0;
    width: 100%;
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

const ButtonInput = styled.input`
  border: 1px solid #3a3a3a;
  background: white;
  border-radius: 4px;
  padding: 4px;
  cursor: pointer;
  margin-top: 16px;

  :hover {
    opacity: 0.5;
  }

  :disabled {
    opacity: 0.25;
    cursor: default;
  }
`;

const DeleteButtonInput = styled(ButtonInput)`
  border: 1px solid #f44336;
  color: #f44336;
  margin-left: 8px;
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
  priceInSek: string;
}

const EditDish = ({ dish }: { dish: DishQuery['dish'] }) => {
  if (!dish) return null;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<FormInputs>({
    defaultValues: {
      name: dish.name,
      description: dish.description,
      imageUrl: dish.imageUrl,
      priceInSek: dish.priceInSek.toString(),
    },
  });
  const [editDish] = useEditDishMutation();
  const [deleteDish] = useDeleteDishMutation();
  const [showSuccessText, setShowSuccessText] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!showSuccessText) return;

    const timeout = setTimeout(() => setShowSuccessText(false), 5000);
    return () => {
      clearTimeout(timeout);
    };
  });

  const onDelete = async (id: number) => {
    deleteDish({
      variables: { id },
      update(cache) {
        const normalizedId = cache.identify({ id, __typename: 'Dish' });
        cache.evict({ id: normalizedId });
        cache.gc();
      },
    });
    await router.push('/');
  };

  const onSubmit = async ({
    name,
    description,
    imageUrl,
    priceInSek,
  }: FormInputs) => {
    const result = await editDish({
      variables: {
        id: dish.id,
        name,
        description,
        imageUrl,
        priceInSek: parseInt(priceInSek, 10),
      },
    });

    const updatedDish = result.data?.updateDish?.query?.dish;
    if (!updatedDish) return;
    reset({
      name: updatedDish.name,
      description: updatedDish.description,
      imageUrl: updatedDish.imageUrl,
      priceInSek: updatedDish.priceInSek.toString(),
    });
    setShowSuccessText(true);
  };

  return (
    <Page>
      <Section>
        <Link href='/' passHref>
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
              errorMessage={errors.name?.message}
            />
            <Input
              {...register('priceInSek', { required: 'Price is required' })}
              type='number'
              name='priceInSek'
              label='Price (SEK)'
              errorMessage={errors.priceInSek?.message}
            />
            <Input
              {...register('description')}
              tag='textarea'
              type='text'
              name='description'
              label='Description'
              optional
              errorMessage={errors.description?.message}
            />
            <Input
              {...register('imageUrl')}
              type='text'
              name='imageUrl'
              label='Image URL'
              optional
              errorMessage={errors.imageUrl?.message}
            />
            <ImageNotice>
              Please use a{' '}
              <a rel='noref noreferrer' href='https://pexels.com'>
                images.pexels.com
              </a>{' '}
              image URL.
            </ImageNotice>
            <ButtonInput type='submit' value='Save' disabled={!isDirty} />
            <DeleteButtonInput
              type='button'
              value='Delete'
              onClick={() => onDelete(dish.id)}
            />
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
    return <Page />;
  }

  if (error || !dish) {
    return (
      <Page>
        <Section>
          <h1>Something went wrong fetching this dish.</h1>
          <p>Please try again later.</p>
        </Section>
      </Page>
    );
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
      priceInSek
    }
  }
`;

const EDIT_DISH_MUTATION = gql`
  mutation EditDish(
    $id: Int!
    $name: String!
    $description: String
    $imageUrl: String
    $priceInSek: Int!
  ) {
    updateDish(
      input: {
        id: $id
        patch: {
          name: $name
          description: $description
          imageUrl: $imageUrl
          priceInSek: $priceInSek
        }
      }
    ) {
      query {
        dish(id: $id) {
          id
          name
          description
          imageUrl
          priceInSek
        }
      }
    }
  }
`;

const DELETE_DISH_MUTATION = gql`
  mutation DeleteDish($id: Int!) {
    deleteDish(input: { id: $id }) {
      clientMutationId
    }
  }
`;

export default withGraphql(EditDishPage, { ssr: true });
