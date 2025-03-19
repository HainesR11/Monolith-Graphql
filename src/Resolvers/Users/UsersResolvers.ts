import QueryWrapper from "../../Helpers/QueryWrapper";
import { QueryTypes, responseTypes, TUsers } from "../../types/types";
import { logger } from "../../utils/logger";
import { userReturnMapper } from "./utils/UserReturnMapper";

export const UserQueryResolvers = {
  async users() {
    return await QueryWrapper({
      query: "SELECT * FROM Users",
      queryType: QueryTypes.Query,
      mapper: userReturnMapper,
    });
  },

  async selectUser(_: unknown, { id }: TUsers) {
    return await QueryWrapper({
      query: "SELECT * FROM Users WHERE user_key = $1",
      queryType: QueryTypes.Query,
      responseType: responseTypes.Single,
      params: [id],
      mapper: userReturnMapper,
    });
  },
};

export const UserMutationResolvers = {
  async createUser(
    _: unknown,
    { firstName, lastName, bio, email, username }: TUsers
  ) {
    const formattedParams = [
      firstName,
      lastName,
      bio,
      email,
      username,
      new Date().toDateString(),
      new Date().toDateString(),
    ];

    return await QueryWrapper({
      query:
        "INSERT INTO Users (first_name, last_name, bio, email, username, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      queryType: QueryTypes.Mutation,
      responseType: responseTypes.Single,
      params: formattedParams,
      mapper: userReturnMapper,
    });
  },
};
