import { isCredentialsValid } from "../../services/login";
import { AuthenticationError } from "apollo-server-express";
import { ERRORS } from "../.././../constants";


const getModulesFromUser = async ({ user }, { credentials } ) => {
	if(isCredentialsValid({ credentials, user })){
		return [{
			name: "Teste 1",
			values: [
				{
					question: "Teste 1",
					answer: "Teste 1"
				}
			]
		}];
	}
	return new AuthenticationError(ERRORS.INVALID_CREDENTIALS);
};

const moduleResolver = {
	Query: {
		Modules: async (_,{ user }, { credentials }) => getModulesFromUser({ user }, { credentials }),
	}
};

export default moduleResolver;