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
