import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import type { NextPage } from 'next';
import styled from 'styled-components';
import { Section } from '../components/Section';
import { useHomeQuery } from '../generated/graphql';
import { withGraphql } from '../utils/with-apollo';

const User = styled.p`
  font-size: 24px;
`;

const Home: NextPage = () => {
  const { data, loading, error } = useHomeQuery();

  if (loading) {
    return null;
  }

  if (error || !data?.users) {
    return <p>Something went wrong</p>;
  }

  return (
    <Section>
      {data.users.nodes.map((user) => (
        <User key={user?.id}>{user?.name}</User>
      ))}
    </Section>
  );
};

const HOME_QUERY = gql`
  query Home {
    users {
      nodes {
        id
        name
      }
    }
  }
`;

export default withGraphql(Home, { ssr: true });
