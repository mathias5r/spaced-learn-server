import { mergeResolvers } from 'merge-graphql-schemas';
import moduleResolver from './resolvers/moduleResolver';

export default mergeResolvers([
  moduleResolver,
]);