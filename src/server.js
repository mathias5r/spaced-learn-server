import { ApolloServer } from "apollo-server-express";
import schema from "./graphql/schema";
import resolvers from "./graphql/resolvers";
import context from "./services/context";

const server = new ApolloServer({
	typeDefs: schema,
	resolvers,
	context,
});

export default server;