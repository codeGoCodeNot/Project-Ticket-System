"use server";

import prisma from "@/lib/prisma";
import { TicketStatus } from "../../../generated/prisma/enums";
import { revalidatePath } from "next/cache";
import { ticketsPath } from "@/path";
import fromErrorToActionState, {
  toActionState,
} from "@/components/form/utils/to-action-state";

const updateTicketStatus = async (id: string, status: TicketStatus) => {
  try {
    await prisma.ticket.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath(ticketsPath());

  return toActionState("SUCCESS", "Status updated");
};

export default updateTicketStatus;
