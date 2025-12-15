import { PostMutationResolvers } from "./Posts/PostMutationResolvers";
import { PostsQueryResolvers } from "./Posts/PostQueryResolvers";
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
