export default  ({ req }) => {
	const token = req.headers.authorization || "";
	console.log("Login attempt with token: ", token );
	return { credentials: token };
};