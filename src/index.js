import 'babel-polyfill';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import schema from './graphql/schema';
import resolvers from './graphql/resolvers';
import mongodb from './database/mongo'; 

const app = express();

const printCollection = async () => {
  const db = await mongodb.spacedlearnDB;
  const collection = await db.collection('users')
    .find({ nome: "Mathias"})
    .toArray((err, result) => {
      if (err) console.log(err)
      console.log(result);
  });
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