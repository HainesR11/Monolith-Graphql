import { QueryTypes, responseTypes } from "../../types/types";
import QueryWrapper from "../../Helpers/QueryWrapper";

export const PostsQueryResolvers = {
  async posts() {
    return await QueryWrapper({
      query: "SELECT * FROM Posts",
      queryType: QueryTypes.Query,
    });
  },

  async post(_: unknown, { id }: { id: string }) {
    return await QueryWrapper({
      query: "SELECT * FROM Posts WHERE id = $1",
      queryType: QueryTypes.Query,
      responseType: responseTypes.Single,
      queryParams: [id],
    });
  },
};

export const PostMutationResolvers = {
  //MAIN POST MUTATIONS
  async createPost() {
    return "Mutation under Maintenance";
  },

  async deletePost() {
    return "Mutation under Maintenance";
  },

  async updatePost() {
    return "Mutation under Maintenance";
  },

  async likePost() {
    return "Mutation under Maintenance";
  },
};
