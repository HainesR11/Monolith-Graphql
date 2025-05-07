import {
  PostMutationResolvers,
  PostsQueryResolvers,
} from "./Posts/PostResolvers";
import {
  UserMutationResolvers,
  UserQueryResolvers,
} from "./Users/UsersResolvers";

const CombinedResolvers = {
  Query: {
    ...PostsQueryResolvers,
    ...UserQueryResolvers,
  },
  Mutation: {
    ...PostMutationResolvers,
    ...UserMutationResolvers,
  },
};

export default CombinedResolvers;
