export const CommentMapper = (data: any) => {
  return {
    id: data.comment_id,
    postId: data.post_id,
    userId: data.user_key,
    content: data.content,
    createdAt: data.created_at,
  };
};
