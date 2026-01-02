import prisma from "@/lib/prisma";

const getTickets = async (userId: string | undefined) => {
  return await prisma.ticket.findMany({
    where: {
      userId,
    },
    orderBy: {
      createAt: "desc",
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });
};

export default getTickets;
