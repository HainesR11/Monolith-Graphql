export const PostMapper = (data: any) => {
  return {
    id: data.id,
    title: data.title,
    content: data.content,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    image: data.image_id,
    author: {
      id: data.author_id,
      name: `${data.first_name} ${data.last_name}`,
      username: data.username,
    },
    commentCount: data.comment_count,
  };
};
