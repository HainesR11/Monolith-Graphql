import QueryWrapper from "../../Helpers/QueryWrapper";
import { QueryTypes, responseTypes, TUsers } from "../../types/types";
import { logger } from "../../utils/logger";
import { userKeySeperation } from "./utils/UserKeySeperation";
import { userQueryMapper, userReturnMapper } from "./utils/UserMappers";
import QueryError from "../../utils/QueryError";

export const UserQueryResolvers = {
  async selectAllUsers() {
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
      query: "SELECT * FROM Users WHERE csuid = $1",
      queryType: QueryTypes.Query,
      responseType: responseTypes.Single,
      queryParams: [id],
      mapper: userReturnMapper,
      onError: (error) => {
        return new QueryError(`No User found for ID: ${id}`, error, "Query");
      },
    });
  },
};

export const UserMutationResolvers = {
  async createUser(
    _: unknown,
    { firstName, lastName, bio, email, username, CSUId }: TUsers
  ) {
    const existingUser = await QueryWrapper({
      query: "SELECT * FROM Users WHERE email = $1",
      queryType: QueryTypes.Query,
      responseType: responseTypes.Array,
      queryParams: [email],
    });

    if (existingUser || existingUser?.length !== 0) {
      return new Error("User already exists");
    }

    const formattedParams = [
      CSUId,
      firstName,
      lastName,
      bio,
      email,
      username,
      new Date().toDateString(),
      new Date().toDateString(),
    ];

    //? Do we add in a call to MongoDB here to create a user in MongoDB as well?
    //? If so we need to make a call to the MongoDB to delete the user?

    //? ^ Yes we do, we can have a unique user id to link the two databases together. e.g. CSUId (Cross System User ID)
    //? Can use the CSUId to remove the entry from both databases

    return await QueryWrapper({
      query:
        "INSERT INTO Users (csuid, first_name, last_name, bio, email, username, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
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
    if (!props.id) {
      logger.error("No ID provided for updateUser");
      return new Error("No ID provided for updateUser");
    }

    const User = await QueryWrapper({
      query: "SELECT * FROM Users WHERE user_key = $1",
      queryType: QueryTypes.Query,
      responseType: responseTypes.Single,
      queryParams: [props.id],
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
