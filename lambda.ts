import { ApolloServer, gql } from 'apollo-server-lambda';
import { buildFederatedSchema } from '@apollo/federation';
import { APIGatewayProxyEvent, Context, Callback } from 'aws-lambda';
import typeDefs from './schema';

const resolvers = {
  Query: {
    allUsers: () => 'user',
  },
};

const createHandler = async () => {
  const server = new ApolloServer({
    playground: { endpoint: '/users' },
    introspection: true,
    schema: buildFederatedSchema([{ typeDefs, resolvers }]),
  });
  return server.createHandler();
};

export const graphql = (event: APIGatewayProxyEvent, context: Context, callback: Callback) => {
  createHandler().then(handler => handler(event, context, callback));
};
