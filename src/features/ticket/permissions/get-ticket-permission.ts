import prisma from "@/lib/prisma";

type GetTIcketPermissions = {
  organizationId: string | undefined;
  userId: string | undefined;
};

const getTicketPermissions = async ({
  organizationId,
  userId,
}: GetTIcketPermissions) => {
  if (!organizationId || !userId) {
    return {
      canDeleteTicket: false,
      canUpdateTicket: false,
    };
  }

  const membership = await prisma.membership.findUnique({
    where: {
      membershipId: {
        userId,
        organizationId,
      },
    },
  });

  if (!membership) {
    return {
      canDeleteTicket: false,
      canUpdateTicket: false,
    };
  }

  return {
    canDeleteTicket: membership.canDeleteTickets,
    canUpdateTicket: membership.canUpdateTickets,
  };
};

export default getTicketPermissions;
