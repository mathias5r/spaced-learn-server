import "babel-polyfill";
import express from "express";
import server from "./server";

const app = express();

server.applyMiddleware({ app, path: "/graphql"});

if(process.env.NODE_ENV != "test"){
	app.listen({ port: 8000 }, () => {
		console.log("Apollo Server on http://localhost:8000/graphql");
	});
}

export default app;