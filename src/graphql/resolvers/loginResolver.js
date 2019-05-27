import mongodb from "../../database/mongo"; 
import { ERRORS } from "../.././../constants";
import { AuthenticationError } from "apollo-server-express";
import { isCredentialsValid, generatePasswordHash, generateToken } from "../../services/login";

const login = async ({ user, password }, { credentials }) => {

	const db = await mongodb.spacedlearnDB;
	const result = await db.collection("users").findOne({ user });

	if(!result){
		return new AuthenticationError(ERRORS.USER_NOT_FOUND);
	}

	if(credentials && isCredentialsValid({ credentials, user})){
		return { value: "sucessfully_loged" };
	}

	const passwordHash = generatePasswordHash({ password, salt: result.salt });
	if(passwordHash === result.password){
		const token = generateToken({ user });
		return { value: "sucessfully_loged", token };
	}
	return { value: "login_failed" };
};

const loginResolver = {
	Mutation: {
		Login: async (_,{ user, password }, { credentials }) => login({ user, password}, { credentials }),
	}
};

export default loginResolver;