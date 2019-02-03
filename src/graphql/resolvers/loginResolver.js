import mongodb from "../../database/mongo"; 
import crypto from "crypto";

const getPasswordHash = ({ password, salt }) => {
	return crypto
		.createHmac("sha256", salt)
		.update(password)
		.digest("hex"); 
};

const login = async ({ email, password, credentials }) => {
	console.log("Attempt to login: ", email," pw: ", password, " credentials: ", credentials );
	const db = await mongodb.spacedlearnDB;
	const user = await db.collection("users").findOne({ user: email });
	const passwordHash = getPasswordHash({ password, salt: user.salt });
	if(passwordHash === user.password){
		return "Sucessfully login";
	}
	return "Login failed";
};

const loginResolver = {
	Mutation: {
		Login: async (_,{ email, password }, {credentials}) => login({ email, password, credentials}),
	}
};

export default loginResolver;