import { getAdminOrRedirect } from "@/features/membership/queries/get-admin-or-redirect";
import prisma from "@/lib/prisma";

const getInvitations = async (organizationId: string) => {
  await getAdminOrRedirect(organizationId);

  return await prisma.invitation.findMany({
    where: { organizationId },
    include: {
      invitedByUser: {
        select: {
          username: true,
          email: true,
        },
      },
    },
  });
};

export default getInvitations;
