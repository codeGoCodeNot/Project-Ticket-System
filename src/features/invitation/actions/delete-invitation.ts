"use server";

import { toActionState } from "@/components/form/utils/to-action-state";
import { getAdminOrRedirect } from "@/features/membership/queries/get-admin-or-redirect";
import prisma from "@/lib/prisma";

type DeleteInvitationParams = {
  email: string;
  organizationId: string;
};

const deleteInvitation = async ({
  email,
  organizationId,
}: DeleteInvitationParams) => {
  await getAdminOrRedirect(organizationId);

  const invitation = await prisma.invitation.findUnique({
    where: {
      invitationId: {
        email,
        organizationId,
      },
    },
  });

  if (!invitation) return toActionState("ERROR", "Invitation not found");

  await prisma.invitation.delete({
    where: {
      invitationId: {
        email,
        organizationId,
      },
    },
  });

  return toActionState("SUCCESS", "Invitation deleted successfully");
};

export default deleteInvitation;
