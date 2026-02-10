"use server";

import fromErrorToActionState, {
  toActionState,
} from "@/components/form/utils/to-action-state";
import getAuthOrRedirect from "@/features/auth/queries/get-auth-or-redirect";
import prisma from "@/lib/prisma";
import getMemberships from "../queries/get-memberships";

type DeleteMembershipParams = {
  userId: string;
  organizationId: string;
  isOwnMembership: boolean;
};

const deleteMembership = async ({
  userId,
  organizationId,
  isOwnMembership,
}: DeleteMembershipParams) => {
  await getAuthOrRedirect();

  try {
    const memberships = await getMemberships(organizationId);

    const isLastMembership = (memberships ?? []).length === 1;

    if (isLastMembership)
      return toActionState(
        "ERROR",
        isOwnMembership
          ? "You cannot leave the organization as you are the last member!"
          : "You cannot delete the last membership of an organization!",
      );

    await prisma.membership.delete({
      where: {
        membershipId: {
          userId,
          organizationId,
        },
      },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  return toActionState(
    "SUCCESS",
    isOwnMembership
      ? "You have left the organization successfully!"
      : "Member removed successfully!",
  );
};

export default deleteMembership;
