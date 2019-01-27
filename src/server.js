import { ApolloServer } from "apollo-server-express";
import schema from "./graphql/schema";
import resolvers from "./graphql/resolvers";

const server = new ApolloServer({
	typeDefs: schema,
	resolvers,
});

export default server;