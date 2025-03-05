import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";

const PostType = new GraphQLObjectType({
  name: "Posts",
  fields: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
  },
});

const PostsType = new GraphQLObjectType({
  name: "Posts",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
  }),
});

const PostsTypes = [PostType];

export default PostType;

