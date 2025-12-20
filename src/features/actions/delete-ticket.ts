"use server";

import { setCookieByKey } from "@/actions/cookies";
import prisma from "@/lib/prisma";
import { ticketsPath } from "@/path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const deleteTickets = async (id: string) => {
  await prisma.ticket.delete({
    where: {
      id,
    },
  });

  revalidatePath(ticketsPath());

  await setCookieByKey("toast", "Ticket deleted");

  redirect(ticketsPath());
};

export default deleteTickets;
