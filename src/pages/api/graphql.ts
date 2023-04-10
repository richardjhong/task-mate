import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { typeDefs, resolvers } from '../../../apollo/schemas';
import { Db as MongoDB } from 'mongodb';
const db = require('./config/connection');

interface ApolloContext {
  db: MongoDB;
}

db.once('open', () => {
  console.log('testing');
});

const server = new ApolloServer<ApolloContext>({
  typeDefs,
  resolvers,
});

export default startServerAndCreateNextHandler(server);