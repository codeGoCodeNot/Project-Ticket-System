"use server";

import fromErrorToActionState, {
  ActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getAdminOrRedirect } from "@/features/membership/queries/get-admin-or-redirect";
import prisma from "@/lib/prisma";
import { invitationsPath } from "@/path";
import { revalidatePath } from "next/cache";
import z from "zod";
import generateInvitationLink from "../utils/generate-invitation-link";
import { inngest } from "@/lib/inngest";

const createInvitationScheme = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .max(191)
    .email("Invalid email format"),
});

const createInvitation = async (
  organizationId: string,
  _actionState: ActionState,
  formData: FormData,
) => {
  const { user } = await getAdminOrRedirect(organizationId);

  try {
    const { email } = createInvitationScheme.parse(
      Object.fromEntries(formData),
    );

    const targetMembership = await prisma.membership.findFirst({
      where: {
        organizationId,
        user: {
          email,
        },
      },
    });

    if (targetMembership)
      return toActionState("ERROR", "User is already a member");

    const emailInvitationLink = await generateInvitationLink(
      user.id,
      organizationId,
      email,
    );

    await inngest.send({
      name: "app/invitation.created",
      data: {
        email,
        organizationId,
        userId: user.id,
        emailInvitationLink,
      },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath(invitationsPath(organizationId));
  return toActionState("SUCCESS", "Invitation created successfully");
};

export default createInvitation;
