import { mergeResolvers } from 'merge-graphql-schemas';
import moduleResolver from './resolvers/moduleResolver';
import loginResolver from './resolvers/loginResolver';

export default mergeResolvers([
  moduleResolver,
  loginResolver,
]);