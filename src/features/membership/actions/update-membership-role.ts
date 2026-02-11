"use server";

import { revalidatePath } from "next/cache";
import { MembershipRole } from "../../../../generated/prisma/enums";
import { getAdminOrRedirect } from "../queries/get-admin-or-redirect";
import getMemberships from "../queries/get-memberships";
import { toActionState } from "@/components/form/utils/to-action-state";
import prisma from "@/lib/prisma";
import { membershipPath } from "@/path";

type UpdateMembershipRoleParams = {
  userId: string;
  organizationId: string;
  membershipRole: MembershipRole;
};

const updateMembershipRole = async ({
  userId,
  organizationId,
  membershipRole,
}: UpdateMembershipRoleParams) => {
  await getAdminOrRedirect(organizationId);

  const memberships = await getMemberships(organizationId);

  const targetMembership = (memberships ?? []).find(
    (membership) => membership.userId === userId,
  );

  if (!targetMembership) {
    return toActionState(
      "ERROR",
      "The specified membership does not exist in this organization!",
    );
  }

  const adminMemberships = (memberships ?? []).filter(
    (membership) => membership.membershipRole === "ADMIN",
  );

  const removesAdmin = targetMembership.membershipRole === "ADMIN";
  const isLastAdmin = adminMemberships.length <= 1;

  if (removesAdmin && isLastAdmin) {
    return toActionState(
      "ERROR",
      "You cannot change the role of this membership as it is the last admin of the organization!",
    );
  }

  await prisma.membership.update({
    where: {
      membershipId: {
        organizationId,
        userId,
      },
    },
    data: {
      membershipRole,
    },
  });

  revalidatePath(membershipPath(organizationId));

  return toActionState("SUCCESS", "Membership role updated successfully!");
};

export default updateMembershipRole;
