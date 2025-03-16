import QueryWrapper from "../../Helpers/QueryWrapper";
import { QueryTypes, responseTypes } from "../../types/types";

export const UserQueryResolvers = {
  async users() {
    return await QueryWrapper({
      query: "SELECT * FROM Users",
      queryType: QueryTypes.Query,
      mapper: (userProps) => {
        return {
          id: userProps.user_key,
          firstName: userProps.first_name,
          lastName: userProps.last_name,
          createdAt: userProps.created_at,
          updatedAt: userProps.updated_at,
          bio: userProps.bio,
          email: userProps.email,
          username: userProps.username,
        };
      },
    });
  },

  async selectUser(_: unknown, { id }: { id: string }) {
    return await QueryWrapper({
      query: "SELECT * FROM Users WHERE user_key = $1",
      queryType: QueryTypes.Query,
      responseType: responseTypes.Single,
      params: [id],
      mapper: (userProps) => {
        return {
          id: userProps.user_key,
          firstName: userProps.first_name,
          lastName: userProps.last_name,
          createdAt: userProps.created_at,
          updatedAt: userProps.updated_at,
          bio: userProps.bio,
          email: userProps.email,
          username: userProps.username,
        };
      },
    });
  },
};
