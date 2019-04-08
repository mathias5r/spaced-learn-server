import mongodb from "../../database/mongo"; 
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY, ERRORS } from "../.././../constants";
import { AuthenticationError } from "apollo-server-express";
import { isCredentialsValid, generatePasswordHash, generateToken } from "../../services/login";

const login = async ({ user, password}, { credentials } ) => {
	const db = await mongodb.spacedlearnDB;
	const userFromDB = await db.collection("users").findOne({ user });

	if(!userFromDB){
		return new AuthenticationError(ERRORS.USER_NOT_FOUND);
	}

	if(credentials && isCredentialsValid({ credentials, user})){
		return "sucessfully_loged";
	}

	const passwordHash = generatePasswordHash({ password, salt: user.salt });
	if(passwordHash === user.password){
		const token = generateToken({ user: user.user });
		console.log(jwt.verify(token, JWT_SECRET_KEY));
		return token;
	}
	return "Login failed";
};

const loginResolver = {
	Mutation: {
		Login: async (_,{ email, password }, { credentials }) => login({ email, password}, { credentials }),
	}
};

export default loginResolver;