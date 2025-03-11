import {
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import QueryWrapper from "../../Helpers/QueryWrapper";
import { QueryTypes } from "../../types/types";

const UserTypes = new GraphQLObjectType({
  name: "Users",
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    username: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    bio: { type: GraphQLString },
  }),
});

export const UsersQuery = new GraphQLObjectType({
  name: "UsersQuery",
  fields: {
    users: {
      type: new GraphQLList(UserTypes),
      resolve: async () =>
        await QueryWrapper({
          query: "SELECT * FROM Users",
          queryType: QueryTypes.Query,
        }),
    },
  },
});

console.log(UsersQuery.getFields());

export default new GraphQLSchema({
  query: UsersQuery,
});
