import { MONGO_DATABASE, MONGO_USER, MONGO_PASSWORD, MONGO_SERVER } from "../../constants";
import { MongoClient } from "mongodb";

const client = async () => {
	const connectionString = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_SERVER}`;
	try {
		const conn = await MongoClient.connect(
			connectionString,
			{ useNewUrlParser: true },
		);
		const db = await conn.db(MONGO_DATABASE);
		console.log("Sucessfully connected to database!");
		return db;
	} catch (err) {
		console.log("Error trying to connect to database: ", err);
		return {};
	}
};

export default {
	spacedlearnDB: client(),
};