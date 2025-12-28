import prisma from "@/lib/prisma";

const getTickets = async () => {
  return await prisma.ticket.findMany({
    orderBy: {
      createAt: "desc",
    },
    include: {
      user: true,
    },
  });
};

export default getTickets;
