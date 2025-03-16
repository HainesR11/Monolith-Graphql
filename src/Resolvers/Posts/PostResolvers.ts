import { GraphQLArgs, GraphQLFieldResolver } from "graphql";

import { QueryTypes, responseTypes } from "../../types/types";
import QueryWrapper from "../../Helpers/QueryWrapper";
import { GraphQLFieldResolverParams } from "@apollo/server";

type PostParams = {
  id: string;
};

export const PostsQueryResolvers = {
  async posts() {
    return await QueryWrapper({
      query: "SELECT * FROM Posts",
      queryType: QueryTypes.Query,
    });
  },

  //   async post(id: string) {
  //     return await QueryWrapper({
  //       query: "SELECT * FROM Posts WHERE id = $1",
  //       queryType: QueryTypes.Query,
  //       responseType: responseTypes.Single,
  //       params: [id],
  //     });
  //   },
};
