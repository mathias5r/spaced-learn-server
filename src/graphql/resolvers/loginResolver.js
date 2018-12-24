const loginResolver = {
  Mutation: {
    Login: (_,{ email, password, credentials }) => {
      console.log('Login attempt!');
      console.log('email', email);
      console.log('password', password);
      console.log('credentials', credentials);
      return "Login attempt";
    },
  }
}

export default loginResolver;