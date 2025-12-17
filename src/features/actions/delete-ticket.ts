"use server";

import prisma from "@/lib/prisma";

const deleteTickets = async (id: string) => {
  await prisma.ticket.delete({
    where: {
      id,
    },
  });
};

export default deleteTickets;
