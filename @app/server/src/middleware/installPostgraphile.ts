import { Express, Request, Response } from 'express';
import { Pool } from 'pg';
import { postgraphile, PostGraphileOptions } from 'postgraphile';
import PgSimplifyInflectorPlugin from '@graphile-contrib/pg-simplify-inflector';

const isDev = process.env.NODE_ENV === 'development';

const postgraphileOptions: PostGraphileOptions<Request, Response> = {
  // This is so that PostGraphile installs the watch fixtures, it's also needed to enable live queries
  ownerConnectionString: process.env.DATABASE_URL,
  // Enable GraphiQL in development
  graphiql: isDev,
  // Use a fancier GraphiQL with `prettier` for formatting, and header editing.
  enhanceGraphiql: true,
  // ignoreIndexes=false: honour your DB indexes - only expose things that are fast
  ignoreIndexes: false,
  // Allow EXPLAIN in development (you can replace this with a callback function if you want more control)
  allowExplain: isDev,
  // https://www.graphile.org/postgraphile/debugging/
  extendedErrors: isDev
    ? [
        'errcode',
        'severity',
        'detail',
        'hint',
        'positon',
        'internalPosition',
        'internalQuery',
        'where',
        'schema',
        'table',
        'column',
        'dataType',
        'constraint',
      ]
    : ['errcode'],
  showErrorStack: isDev,
  // Automatically update GraphQL schema when database changes
  watchPg: isDev,
  // Keep data/schema.graphql up to date
  sortExport: true,
  // Plugins to customize GraphQL schema
  appendPlugins: [PgSimplifyInflectorPlugin],
  exportGqlSchemaPath: isDev
    ? `${__dirname}/../../../../data/schema.graphql`
    : undefined,
  disableQueryLog: true,
  legacyRelations: 'omit',
};

const pgPool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export default function installPostGraphile(app: Express) {
  const middleware = postgraphile<Request, Response>(
    pgPool,
    'app_public',
    postgraphileOptions,
  );

  app.set('postgraphileMiddleware', middleware);
  app.use(middleware);
}
