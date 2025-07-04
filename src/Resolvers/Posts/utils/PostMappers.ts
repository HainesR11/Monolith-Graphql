import { logger } from "../../../utils/logger";

export const PostMapper = (data: any) => {
  return {
    id: data.id,
    title: data.title,
    content: data.content,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    author: {
      name: `${data.first_name} ${data.last_name}`,
    },
  };
};
