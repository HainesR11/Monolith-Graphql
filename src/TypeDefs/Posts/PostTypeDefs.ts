import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";

const PostType = new GraphQLObjectType({
  name: "Posts",
  fields: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
  },
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    posts: {
      type: new GraphQLList(PostType),
      async resolve(_, args) {
        const result = await pool.query("SELECT * FROM users");
        return result.rows;
      },
    },
    post: {
      type: PostType,
      args: { id: { type: GraphQLInt } },
      async resolve(_, args) {
        const result = await pool.query("SELECT * FROM users WHERE id = $1", [
          args.id,
        ]);
        return result.rows[0];
      },
    },
  },
});

const PostTypeDefs = new GraphQLSchema({
  query: RootQuery,
});

export default PostTypeDefs;
