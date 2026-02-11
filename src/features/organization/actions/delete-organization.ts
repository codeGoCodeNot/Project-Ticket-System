"use server";

import fromErrorToActionState, {
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getAdminOrRedirect } from "@/features/membership/queries/get-admin-or-redirect";
import prisma from "@/lib/prisma";
import getOrganizationsByUser from "../queries/get-organizations-by-user";

const deleteOrganization = async (organizationId: string) => {
  await getAdminOrRedirect(organizationId);

  try {
    const organizations = await getOrganizationsByUser();
    const canDelete = organizations.some(
      (organization) => organization.id === organizationId,
    );

    if (!canDelete)
      return toActionState(
        "ERROR",
        "You are not a member of this organization",
      );

    await prisma.organization.delete({
      where: {
        id: organizationId,
      },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  return toActionState("SUCCESS", "Organization deleted successfully!");
};

export default deleteOrganization;
