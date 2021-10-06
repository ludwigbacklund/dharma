# Dharma

Dharma is a food ordering web-app that lets companies upload their menu and users to put in orders for food.

Try it out: https://dharma-karma.herokuapp.com/

Play with the API: https://dharma-karma.herokuapp.com/graphiql

Keep in mind that it is running the hobby tier of Heroku Postgres so don't put in more than 10,000 orders! 😅

## Summary

This is a TypeScript monorepo containing a client, server and configuration. It is backed by a PostgreSQL database running locally via docker-compose and hosted by Heroku in production.

The application runs only one process, the Express server, with the Next.js client being mounted as middleware to that server. This makes it easier to deploy, and keeps moving parts to a minimum.

The server resolves around an Express server and PostGraphile, a library that builds a performant, customizable GraphQL API for you based on your PostgreSQL database schema. This speeds up development by reducing boilerplate and CRUD code.

The client is a Next.js TypeScript application running apollo-client to communicate with the server GraphQL API. Furthermore, graphql-codegen is used to get full end-to-end type safety from server to client during development.

## Getting started

1. Install [docker + docker-compose](https://docs.docker.com/get-docker/) and [dbmate](https://github.com/amacneil/dbmate#installation)

2. Start the database via docker-compose

```
docker-compose up -d
```

3. Rename `.env.example` to `.env`

4. Run pending database migrations

```
dbmate up
```

5. Start the application

```
yarn dev
```

That's it. Open the URL linked to in the terminal and enjoy!

## Omitted on purpose

The following functionality has been intentionally left out due to time constraints and prioritizing other things.

- Authentication/authorization
- Security in general
- Logging
- Design system
- Testing
- Linting
- Empty states
- Cleaning up unused fields in GraphQL API (they remain to show off what this setup can do)
- Subscriptions
- Robust error handling
- Robust input validation
- SEO
