const posts = [
  {
    id: "1",
    title: "Hello World",
    body: "This is my first post",
  },
];

const qureyWrapper = (context, query) => {
  if (!context.token) {
    throw new Error(
      "Unauthenticated User: You must be logged in to see this post"
    );
  }

  return query;
};

const resolvers = {
  Query: {
    posts: () => posts,
    post: (_, { id }, context) =>
      qureyWrapper(
        context,
        posts.find((post) => post.id === id)
      ),
  },
};

export default resolvers;
