// features/comments/queries/get-comment.ts
import prisma from "@/lib/prisma";

const getComment = async (commentId: string) => {
  return await prisma.comment.findUnique({
    where: {
      id: commentId,
    },
  });
};

export default getComment;
