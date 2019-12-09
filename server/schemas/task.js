import { gql } from 'apollo-server';

export default gql`
  type Task {
    id: ID!
    title: String!
    status: String!
    author: User!
  }

  extend type Query {
    task(id: ID!): Task!
    tasks: [Task!]!
  }

  extend type Mutation {
    createTask(title: String!, status: String!): Task!
  }
`;