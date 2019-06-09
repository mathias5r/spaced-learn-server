import supertest from "supertest";
import app from "../src/index";
import { generatePasswordHash, isCredentialsValid } from "../src/services/login";

const request = supertest(app);

const makeRequest = async payload => 
	request
		.post("/graphql")
		.set("Accept","application/json")
		.send(payload);

const login = () => ({
	query: `mutation{ 
            Login(user: "mathias",password: "12345"){
							value
							token
						}
        }`
});

const user = "mathias";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoibWF0aGlhcyIsImlhdCI6MTU1NDY4OTg4Nn0.yaHIRimZ8ZGFxger8g3CAYOFVNmMvZk-nqfDOPQnw70";

describe("Login", () => {
	test("Testing generatePasswordHash", () => {
		const salt = "5a4dc01364d96051";
		const password= "12345"; 
		const passwordHash = generatePasswordHash({ password, salt });
		expect(passwordHash).toBe("dc95a1b91fcbc37573f38d25f408de2d55f72513e6eaae94e01816f746311b13");
	}),
	test("Testing isCredentialsValid", () => {
		const isCredentialValid =  isCredentialsValid({ credentials: token, user });
		expect(isCredentialValid).toBe(true);
	});
	test("Get sucessfully user with right login user", async () => {
		const response = await makeRequest(login());
		const { value, token } = response.body.data.Login;
		expect(value).toBe("sucessfully_loged");
		expect(token).not.toBeNull();
	});
});

