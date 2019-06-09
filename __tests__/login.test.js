import supertest from "supertest";
import app from "../src/index";
import { generatePasswordHash, isCredentialsValid } from "../src/services/login";

const request = supertest(app);

const makeRequest = async payload => 
	request
		.post("/graphql")
		.set("Accept","application/json")
		.send(payload);

const login = ({ user, password }) => ({
	query: `mutation{ 
            Login(user:"${user}",password:"${password}"){
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
	test("Get sucessfully response with right user and password", async () => {
		const response = await makeRequest(login({ user, password: "12345"}));
		const { value, token } = response.body.data.Login;
		expect(value).toBe("sucessfully_loged");
		expect(token).not.toBeNull();
	});
	test("Get failed response with wrong password", async () => {
		const response = await makeRequest(login({ user, password: ""}));
		const { value, token } = response.body.data.Login;
		expect(value).toBe("login_failed");
		expect(token).toBeNull();
	});
	test("Get failed response with unexistent user", async () => {
		const response = await makeRequest(login({ user: "", password: ""}));
		const { message } = response.body.errors[0];
		expect(response.body.data.Login).toBeNull();
		expect(message).toBe("user_not_found");
	});
});

