import { PostsQueryResolvers } from "./Posts/PostResolvers";
import { UserQueryResolvers } from "./Users/UsersResolvers";

const CombinedResolvers = {
  Query: {
    ...PostsQueryResolvers,
    ...UserQueryResolvers,
  },
};

export default CombinedResolvers;
