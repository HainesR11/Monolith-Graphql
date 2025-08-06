import { QueryTypes, responseTypes } from "../../types/types";
import QueryWrapper from "../../Helpers/QueryWrapper";
import { logger } from "../../utils/logger";
import { CommentMapper } from "./utils/CommentMappers";
import { PostMapper } from "./utils/PostMappers";
import QueryError from "../../utils/QueryError";

export const PostsQueryResolvers = {
  /**
   *
   * @param Limit - Limit the number of Posts returned
   * @param Offset - Offset the number of Posts returned
   */
  async getPosts(
    _: unknown,
    { limit, offset }: { limit?: number; offset?: number }
  ) {
    return await QueryWrapper({
      query:
        "SELECT usr.* as author_id, pst.*, COUNT(cmt.*) as comment_count FROM Posts pst JOIN Users usr ON pst.author_id = usr.user_key LEFT JOIN Comments cmt ON pst.id = cmt.post_id GROUP BY pst.id, usr.first_name, usr.last_name, usr.user_key ORDER BY pst.created_at DESC LIMIT $1 OFFSET $2",
      queryType: QueryTypes.Query,
      responseType: responseTypes.Array,
      queryParams: [limit ?? 10, offset ?? 0],
      mapper: PostMapper,
      onError: (error) => {
        logger.error(`Error fetching posts: ${error}`);
        return new QueryError("Failed to fetch posts", error);
      },
    });
  },

  /**
   *
   * @param Id - The ID of the Post to fetch from database
   */
  async getPost(_: unknown, { id }: { id: string }) {
    return await QueryWrapper({
      query:
        "SELECT usr.*, pst.*, COUNT(cmt.*) as comment_count FROM Posts pst JOIN Users usr ON pst.author_id = usr.user_key LEFT JOIN Comments cmt ON pst.id = cmt.post_id WHERE pst.id = $1 GROUP BY pst.id, usr.first_name, usr.last_name, usr.user_key",
      queryType: QueryTypes.Query,
      responseType: responseTypes.Single,
      queryParams: [id],
      mapper: PostMapper,
    });
  },

  /**
   *
   * @param postId - The ID of the Post to fetch the comments from database
   */
  async getComments(
    _: unknown,
    {
      postId,
      limit = 10,
      offset = 0,
    }: { postId: string; limit?: number; offset?: number }
  ) {
    return await QueryWrapper({
      query:
        "SELECT usr.first_name, usr.last_name, cmt.* FROM comments cmt JOIN Users usr ON cmt.user_key = usr.user_key WHERE post_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3",
      queryType: QueryTypes.Query,
      responseType: responseTypes.Array,
      queryParams: [postId, limit ?? 10, offset ?? 0],
      mapper: CommentMapper,
      onError: (error) => {
        logger.error(`Error fetching comments for post ${postId}: ${error}`);
        return new QueryError("Failed to fetch comments", error);
      },
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
