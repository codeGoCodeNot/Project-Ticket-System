"use server";

import prisma from "@/lib/prisma";
import { getAdminOrRedirect } from "../queries/get-admin-or-redirect";
import { toActionState } from "@/components/form/utils/to-action-state";
import { revalidatePath } from "next/cache";
import { membershipPath } from "@/path";

type PermissionKey = "canDeleteTickets"; // For now, we only have one permission, but this can be extended in the future

type TogglePermissionParams = {
  userId: string;
  organizationId: string;
  permissionKey: PermissionKey;
};

const togglePermission = async ({
  userId,
  organizationId,
  permissionKey,
}: TogglePermissionParams) => {
  await getAdminOrRedirect(organizationId);

  const where = {
    membershipId: {
      userId,
      organizationId,
    },
  };

  const membership = await prisma.membership.findUnique({
    where,
  });

  if (!membership) return toActionState("ERROR", "Membership not found");

  await prisma.membership.update({
    where,
    data: {
      [permissionKey]: !membership[permissionKey],
    },
  });

  revalidatePath(membershipPath(organizationId));

  return toActionState("SUCCESS", "Permission updated successfully");
};

export default togglePermission;
