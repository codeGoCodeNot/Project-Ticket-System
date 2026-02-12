import { Prisma } from "../../../generated/prisma/browser";

export type TicketWithMetaData = Prisma.TicketGetPayload<{
  include: {
    user: {
      select: {
        username: true;
      };
    };
  };
}> & { isOwner: boolean; permissions: { canDeleteTicket: boolean } };
