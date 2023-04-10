
import { gql } from 'graphql-tag';

const typeDefs = gql`
  enum TaskStatus {
    active
    completed
  }

  type Task {
    id: ID
    title: String!
    status: TaskStatus!
  }

  input CreateTaskInput {
    title: String!
  }

  input UpdateTaskInput {
    id: ID
    title: String
    status: TaskStatus
  }

  type Book {
    title: String
    author: String
  }
  
  type Example {
    name: String!
  }

  type User {
    firstName: String
    lastName: String
  }

  type Query {
    tasks(status: TaskStatus): [Task!]!
    task(id: ID!): Task
    books: [Book]
    users: [User]
  }

  type Mutation {
    createTask(input: CreateTaskInput!): Task
    updateTask(input: UpdateTaskInput!): Task
    deleteTask(id: ID!): Task
  }
`;

export default typeDefs;