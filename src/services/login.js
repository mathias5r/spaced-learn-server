import jwt from "jsonwebtoken";
import crypto from "crypto";
import { JWT_SECRET_KEY } from "../../constants";

export const generatePasswordHash = ({ password, salt }) => {
	return crypto
		.createHmac("sha256", salt)
		.update(password)
		.digest("hex"); 
};

export const generateToken = payload => {
	const token = jwt.sign(payload, JWT_SECRET_KEY);
	return token;
}; 


export const isCredentialsValid = ({ credentials, user }) => {
	if(credentials){
		const payload = jwt.verify(credentials, JWT_SECRET_KEY);
		if(payload.user === user){
			return true;
		}
	}
	return false;
};