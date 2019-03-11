import mongodb from "../../database/mongo"; 
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../.././../constants";

const getPasswordHash = ({ password, salt }) => {
	return crypto
		.createHmac("sha256", salt)
		.update(password)
		.digest("hex"); 
};

const generateToken = payload => {
	const token = jwt.sign(payload, JWT_SECRET_KEY);
	return token;
}; 


const login = async ({ email, password}, { credentials } ) => {
	const db = await mongodb.spacedlearnDB;
	console.log(credentials);
	const user = await db.collection("users").findOne({ user: email });
	const passwordHash = getPasswordHash({ password, salt: user.salt });
	if(passwordHash === user.password){
		return generateToken({ user: user.user });
	}
	return "Login failed";
};

const loginResolver = {
	Mutation: {
		Login: async (_,{ email, password }, { credentials }) => login({ email, password}, { credentials }),
	}
};

export default loginResolver;