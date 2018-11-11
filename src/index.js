import 'babel-polyfill';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import schema from './graphql/schema';
import resolvers from './graphql/resolvers';
import mongodb from './database/mongo'; 

const app = express();

const printCollection = async () => {
  const db = await mongodb.spaced_learn_db;
  const collection = await db.collection('spacedlearn').find();
  console.log(collection);
}

printCollection();

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
})

server.applyMiddleware({ app, path: '/graphql'})

app.listen({ port: 8000 }, () => {
  console.log('Apollo Server on http://localhost:8000/graphql');
});