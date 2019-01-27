import mongodb from "../../database/mongo"; 

const login = async ({ email, password, credentials }) => {
	console.log("Attempt to login: ", email," pw: ", password, " credentials: ", credentials );
	const db = await mongodb.spacedlearnDB;
	const user = await db.collection("users").findOne({ user: email });
	if(user) return "User found";
	return "User not found";
};

const loginResolver = {
	Mutation: {
		Login: async (_,{ email, password }, {credentials}) => login({ email, password, credentials}),
	}
};

export default loginResolver;