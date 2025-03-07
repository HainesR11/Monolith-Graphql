import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLID,
} from "graphql";
import QueryWrapper from "../../Helpers/QueryWrapper";
import { QueryTypes, ResultsTypes } from "../../types/types";

const PostType = new GraphQLObjectType({
  name: "Post",
  fields: () => ({
    id: { type: GraphQLID },
    userId: { type: GraphQLID, resolve: (post) => post.user_key },
    name: { type: GraphQLString },
    content: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  }),
});

const PostQuery = new GraphQLObjectType({
  name: "PostQuery",
  fields: {
    posts: {
      type: new GraphQLList(PostType),
      resolve: async () =>
        await QueryWrapper({
          query: "SELECT * FROM Posts",
          queryType: QueryTypes.Query,
        }),
    },

    post: {
      type: PostType,
      args: { id: { type: GraphQLID } },
      resolve: async (_, args) =>
        await QueryWrapper({
          query: "SELECT * FROM Posts WHERE id = $1",
          queryType: QueryTypes.Query,
          resultsType: ResultsTypes.Single,
          params: [args.id],
        }),
    },
  },
});

export default new GraphQLSchema({
  query: PostQuery,
});
