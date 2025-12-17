"use server";
import prisma from "@/lib/prisma";

const deleteTicket = async (id: string) => {
  await prisma.ticket.delete({
    where: {
      id,
    },
  });
};

export default deleteTicket;
