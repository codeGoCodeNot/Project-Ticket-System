"use server";

import getAuth from "@/features/auth/queries/get-auth";
import isOwner from "@/features/auth/utils/is-owner";
import prisma from "@/lib/prisma";

const getComments = async (
  ticketId: string,
  cursor?: {
    id: string;
    createdAt: number;
  },
) => {
  const { user } = await getAuth();

  const take = 2;

  const where = {
    ticketId,
  };

  let [comments, count] = await prisma.$transaction([
    prisma.comment.findMany({
      where,
      take: take + 1,
      cursor: cursor
        ? { id: cursor.id, createdAt: new Date(cursor.createdAt) }
        : undefined,
      skip: cursor ? 1 : 0,
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    }),
    prisma.comment.count({
      where,
    }),
  ]);

  const hasNextPage = comments.length > take;
  comments = hasNextPage ? comments.slice(0, -1) : comments;

  const lastComment = comments.at(-1);

  return {
    list: comments.map((comment) => ({
      ...comment,
      isOwner: isOwner(user, comment),
    })),
    metadata: {
      count,
      hasNextPage: hasNextPage,
      cursor: lastComment
        ? {
            id: lastComment.id,
            createdAt: lastComment.createdAt.valueOf(),
          }
        : undefined,
    },
  };
};

export default getComments;
