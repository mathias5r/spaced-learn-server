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
            Login(
              user: "mathias", 
              password: "12345", 
          )
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
		const credentials = { token };
		const isCredentialValid =  isCredentialsValid({ credentials, user });
		expect(isCredentialValid).toBe(true);
	});
	test.skip("Get sucessfully user with right login user", async () => {
		const response = await makeRequest(login());
		expect(response.body.data.Login).toBe("Sucessfully login");
	});
});

