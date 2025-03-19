import { PostsQueryResolvers } from "./Posts/PostResolvers";
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
    ...UserMutationResolvers,
  },
};

export default CombinedResolvers;
