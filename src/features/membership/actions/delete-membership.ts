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
  const { user } = await getAuthOrRedirect();

  try {
    const memberships = await getMemberships(organizationId);

    const isLastMembership = (memberships ?? []).length === 1;

    const tagertMembership = (memberships ?? []).find(
      (membership) => membership.userId === userId,
    );

    if (!tagertMembership)
      return toActionState(
        "ERROR",
        "The specified membership does not exist in this organization!",
      );

    const admimMembership = (memberships ?? []).filter(
      (membership) => membership.membershipRole === "ADMIN",
    );

    const removesAdmin = tagertMembership.membershipRole === "ADMIN";
    const isLastAdmin = admimMembership.length <= 1;

    if (removesAdmin && isLastAdmin)
      return toActionState(
        "ERROR",
        isOwnMembership
          ? "You cannot leave the organization as you are the last admin!"
          : "You cannot delete this membership as it is the last admin of the organization!",
      );

    if (isLastMembership)
      return toActionState(
        "ERROR",
        isOwnMembership
          ? "You cannot leave the organization as you are the last member!"
          : "You cannot delete the last membership of an organization!",
      );

    const myMembership = (memberships ?? []).find(
      (membership) => membership.userId === user.id,
    );

    const isMyself = user.id === userId;
    const isAdmin = myMembership?.membershipRole === "ADMIN";

    if (!isAdmin && !isMyself)
      return toActionState(
        "ERROR",
        "Only organization admins can delete memberships!",
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
