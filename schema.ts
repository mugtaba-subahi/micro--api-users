import { gql } from 'apollo-server-lambda';

export default gql`
  type User {
    title: String
  }

  type Query {
    allUsers: String
  }
`;
