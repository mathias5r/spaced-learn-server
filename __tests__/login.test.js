import axios from "axios";

const login = `
  mutation{ 
      Login(
        email: "mathiassilva4@gmail.com", 
        password: "12345", 
        credentials: "credentials"
      )
  }
`;

describe("Login", () => {
	test("Get sucessfully user with rigth login user", async () => {
		const response = await axios.post("http://localhost:8000/graphql", {
			query: login
		});
		const { data } = response;
		console.log(data);
	});
});

