import QueryWrapper from "../../Helpers/QueryWrapper";
import { QueryTypes, responseTypes, TUsers } from "../../types/types";
import { logger } from "../../utils/logger";
import { userKeySeperation } from "./utils/UserKeySeperation";
import { userQueryMapper, userReturnMapper } from "./utils/UserMappers";

export const UserQueryResolvers = {
  async users() {
    return await QueryWrapper({
      query: "SELECT * FROM Users",
      queryType: QueryTypes.Query,
      mapper: userReturnMapper,
    });
  },

  //Add catch here if no user is found
  async selectUser(_: unknown, { id }: Partial<TUsers>) {
    if (!id) {
      logger.error("No ID provided for selectUser");
      return new Error("No ID provided for selectUser");
    }

    return await QueryWrapper({
      query: "SELECT * FROM Users WHERE user_key = $1",
      queryType: QueryTypes.Query,
      responseType: responseTypes.Single,
      queryParams: [id],
      mapper: userReturnMapper,
    });
  },
};

export const UserMutationResolvers = {
  async createUser(
    _: unknown,
    { firstName, lastName, bio, email, username }: TUsers
  ) {
    const User = await QueryWrapper({
      query: "SELECT * FROM Users WHERE email = $1",
      queryType: QueryTypes.Query,
      responseType: responseTypes.Single,
      queryParams: [email],
    });

    if (User) {
      return new Error("User already exists");
    }

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
      queryParams: formattedParams,
      mapper: userReturnMapper,
    });
  },

  async deleteUser(_: unknown, { id }: TUsers) {
    if (!id) {
      logger.error("No ID provided for deleteUser");
      return new Error("No ID provided for deleteUser");
    }

    const deletedUser = await QueryWrapper({
      query: "DELETE FROM Users WHERE user_key = $1 RETURNING *",
      queryType: QueryTypes.Mutation,
      responseType: responseTypes.Single,
      queryParams: [id],
    });

    if (!deletedUser) {
      return new Error("User not found");
    }

    return "User deleted successfully";
  },

  async updateUser(_: unknown, props: Partial<TUsers>) {
    const User = await QueryWrapper({
      query: "SELECT * FROM Users WHERE user_key = $1",
      queryType: QueryTypes.Query,
      responseType: responseTypes.Single,
      queryParams: [props.id ?? ""],
    });

    if (!User) {
      return new Error("User not found");
    }

    const { queryKeys, params } = userKeySeperation({
      props,
      mapper: userQueryMapper,
    });

    return await QueryWrapper({
      query: `UPDATE Users SET ${queryKeys.join(
        ", "
      )} WHERE user_key = $1 RETURNING *`,
      queryType: QueryTypes.Mutation,
      responseType: responseTypes.Single,
      queryParams: [...params],
      mapper: userReturnMapper,
    });
  },
};
