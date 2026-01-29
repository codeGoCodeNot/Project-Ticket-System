import prisma from "@/lib/prisma";

const getComments = async (ticketId: string) => {
  return await prisma.comment.findMany({
    where: {
      ticketId,
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export default getComments;
