import prisma from "@/lib/prisma";

const getTickets = async () => {
  return await prisma.ticket.findMany({
    orderBy: {
      createAt: "desc",
    },
  });
};

export default getTickets;
