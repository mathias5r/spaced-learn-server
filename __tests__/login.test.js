import supertest from "supertest";
import app from "../src/index";

const request = supertest(app);

const makeRequest = async payload => 
	request
		.post("/graphql")
		.set("Accept","application/json")
		.send(payload);

const login = () => ({
	query: `mutation{ 
            Login(
              email: "mathiassilva4@gmail.com", 
              password: "12345", 
              credentials: "credentials"
          )
        }`
});

describe("Login", () => {
	test("Get sucessfully user with right login user", async () => {
		const response = await makeRequest(login());
		expect(response.body.data.Login).toBe("User found");
	});
});

