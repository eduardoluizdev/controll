import { gql } from 'apollo-server-micro'

export const typeDefs = gql`
  type Query {
    customers: [Customer]
  }

  type Mutation {
    createCustomer(name: String!, email: String!): Customer
  }

  type Customer {
    id: ID
    name: String
    email: String
  }
`;
