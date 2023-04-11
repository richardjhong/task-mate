import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { schema } from '../../../backend/schemas';
import { Db as MongoDB } from 'mongodb';
const db = require('../../../backend/config/connection');

interface ApolloContext {
  db: MongoDB;
}

db.once('open', () => {
  console.log('Connected to database');
  console.log(`Use GraphQL at http://localhost/api/graphql`);
});

const server = new ApolloServer<ApolloContext>({ schema });

export default startServerAndCreateNextHandler(server);