import { ApolloServer, gql } from 'apollo-server-lambda';
import { buildFederatedSchema } from '@apollo/federation';
import { APIGatewayProxyEvent, Context, Callback } from 'aws-lambda';
import { importSchema } from 'graphql-import';

const typeDefs = importSchema('schema.graphql');

const resolvers = {
  Query: {
    allUsers: () => 'new userwe',
  },
};

const createHandler = async () => {
  const server = new ApolloServer({
    playground: { endpoint: '/users' },
    schema: buildFederatedSchema([{ typeDefs: gql(typeDefs), resolvers }]),
  });
  return server.createHandler();
};

export const graphql = (event: APIGatewayProxyEvent, context: Context, callback: Callback) => {
  createHandler().then(handler => handler(event, context, callback));
};
