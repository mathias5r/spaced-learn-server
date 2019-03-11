db.users.drop();
db.users.insertMany([
	{
		user: "mathiassilva4@gmail.com",
		password: "dc95a1b91fcbc37573f38d25f408de2d55f72513e6eaae94e01816f746311b13",
		salt: "5a4dc01364d96051",
		modules: ["Inglês", "Português", "Matemática"]
	},
	{
		user: "usertest@test.com",
		password: "e27a8157d05ee4204b69823767302a597ed5f2219670701e5a8acafd6ef52ce3",
		salt: "cefbd56f211d32e2",
		modules: ["Biologia", "História", "Concurso"]
	}
]);