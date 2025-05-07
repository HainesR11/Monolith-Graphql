import { TUsers } from "../../../types/types";

export const userReturnMapper = (userProps: any) => {
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
};

export const userQueryMapper = (userProps: any) => {
  return {
    ...(userProps.id && { user_key: userProps.id }),
    ...(userProps.firstName && { first_name: userProps.firstName }),
    ...(userProps.lastName && { last_name: userProps.lastName }),
    ...(userProps.createdAt && { created_at: userProps.createdAt }),
    ...(userProps.updatedAt && { updated_at: userProps.updatedAt }),
    ...(userProps.bio && { bio: userProps.bio }),
    ...(userProps.email && { email: userProps.email }),
    ...(userProps.username && { username: userProps.username }),
  };
};
