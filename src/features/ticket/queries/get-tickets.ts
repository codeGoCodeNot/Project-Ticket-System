import prisma from "@/lib/prisma";

const getTickets = async () => {
  return await prisma.ticket.findMany({
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
