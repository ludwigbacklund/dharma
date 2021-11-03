import { useEffect, useState } from 'react';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import { Page } from '../components/Page';
import { Section } from '../components/Section';
import { useAddDishMutation } from '../generated/graphql';
import { withGraphql } from '../utils/with-apollo';
import { Input } from '../components/Input';
import { Heading } from '../components/Heading';
import { media } from '../utils/styling';
import { useRouter } from 'next/dist/client/router';
import { ErrorNotice } from '../components/ErrorNotice';

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

interface FormInputs {
  name: string;
  description?: string | null;
  imageUrl?: string | null;
  priceInSek: string;
}

const AddDish = () => {
  const {
    register,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm<FormInputs>();
  const [addDish, { error }] = useAddDishMutation();
  const { push } = useRouter();

  const onSubmit = async ({
    name,
    description,
    imageUrl,
    priceInSek,
  }: FormInputs) => {
    await addDish({
      variables: {
        name,
        description,
        imageUrl,
        priceInSek: parseInt(priceInSek, 10),
      },
    });

    await push('/');
  };

  return (
    <Page>
      <Section>
        {error && (
          <ErrorNotice message='Something went wrong adding this dish. Please try again later.' />
        )}
        <Link href='/' passHref>
          <BackAnchor>Back to menu</BackAnchor>
        </Link>
        <Heading>Add dish</Heading>
        <Wrapper>
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
            {isDirty && <SaveButtonInput type='submit' value='Add dish' />}
          </StyledForm>
        </Wrapper>
      </Section>
    </Page>
  );
};

const ADD_DISH_MUTATION = gql`
  mutation AddDish(
    $name: String!
    $description: String
    $imageUrl: String
    $priceInSek: Int!
  ) {
    createDish(
      input: {
        dish: {
          name: $name
          description: $description
          imageUrl: $imageUrl
          companyId: 1
          priceInSek: $priceInSek
        }
      }
    ) {
      company {
        id
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

export default withGraphql(AddDish);
