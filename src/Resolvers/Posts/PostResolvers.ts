import { QueryTypes, responseTypes } from "../../types/types";
import QueryWrapper from "../../Helpers/QueryWrapper";
import { HomePostStub } from "../../../test/stubs/posts";
import { logger } from "../../utils/logger";

export const PostsQueryResolvers = {
  async posts(
    _: unknown,
    { limit, offset }: { limit?: number; offset?: number }
  ) {
    // return await QueryWrapper({
    //   query: "SELECT * FROM Posts",
    //   queryType: QueryTypes.Query,
    // });

    logger.info({
      offset,
      limit,
    });

    const pagination = HomePostStub.slice(offset, (limit ?? 0) + (offset ?? 0));

    return pagination;

    // return await QueryWrapper({
    //   query: "SELECT * FROM Posts ORDER BY created_at DESC LIMIT $1 OFFSET $2",
    //   queryType: QueryTypes.Query,
    //   responseType: responseTypes.Array,
    //   queryParams: [limit ?? 10, offset ?? 0],
    // });
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
