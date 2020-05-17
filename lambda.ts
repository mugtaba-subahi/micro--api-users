import typeDefs from './schema';
import { ApolloServer } from 'apollo-server-lambda';
import { buildFederatedSchema } from '@apollo/federation';
import { APIGatewayProxyEvent, Context, Callback } from 'aws-lambda';

const resolvers = {
  Query: {
    allPosts: () => 'post',
  },
};

const createHandler = async () => {
  const server = new ApolloServer({
    playground: { endpoint: '/dev' },
    schema: buildFederatedSchema([{ typeDefs, resolvers }]),
  });
  return server.createHandler();
};

export const graphql = (event: APIGatewayProxyEvent, context: Context, callback: Callback) => {
  createHandler().then(handler => handler(event, context, callback));
};
