const { gql } = require('apollo-server-express');

const typeDefs = gql`

type Query {
    me: User
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    bookCount: String
    savedBooks: [Book]
  }
  type Auth {
    token: ID!
    user: User
  }
  type Book {
    bookId: ID!
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }
  input SavedBook {
    bookId: String
    authors: [String]
    title: String
    description: String
    image: String
    link: String
  }
 
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(input: SavedBook!): User
    removeBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;