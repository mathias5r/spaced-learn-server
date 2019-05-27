export default  ({ req }) => {
	const token = req.headers.authorization || "";
	console.log("Receiving request with token: ", token );
	return { credentials: token };
};