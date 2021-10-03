import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { getDataFromTree } from '@apollo/client/react/ssr';
import { NextPage } from 'next';
import nextWithApollo from 'next-with-apollo';

const ROOT_URL = process.env.ROOT_URL;
if (!ROOT_URL) {
  throw new Error('ROOT_URL environment variable is not set');
}

export const withApollo = nextWithApollo(
  ({ initialState }) => {
    return new ApolloClient({
      uri: `${ROOT_URL}/graphql`,
      cache: new InMemoryCache().restore(initialState || {}),
    });
  },
  {
    render: ({ Page, props }) => {
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} />
        </ApolloProvider>
      );
    },
  },
);

export const withGraphql = (Page: NextPage, options?: { ssr: boolean }) => {
  return withApollo(Page, {
    getDataFromTree: options?.ssr ? getDataFromTree : undefined,
  });
};
