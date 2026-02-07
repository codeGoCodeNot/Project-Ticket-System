"use server";

import fromErrorToActionState, {
  ActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import getAuthOrRedirect from "@/features/auth/queries/get-auth-or-redirect";
import { inngest } from "@/lib/inngest";
import prisma from "@/lib/prisma";
import { z } from "zod";

const requestEmailChangeSchema = z.object({
  newEmail: z
    .string()
    .min(1, { message: "Email is required" })
    .max(191)
    .email("Invalid email address"),
});

const requestEmailChange = async (
  _actionState: ActionState,
  formData: FormData,
) => {
  try {
    const { user } = await getAuthOrRedirect();

    const { newEmail } = requestEmailChangeSchema.parse(
      Object.fromEntries(formData),
    );

    // Check if new email is same as current
    if (newEmail.toLowerCase() === user.email.toLowerCase()) {
      return toActionState(
        "ERROR",
        "New email cannot be the same as your current email",
        formData,
      );
    }

    // Check if email is already taken by another user
    const existingUser = await prisma.user.findUnique({
      where: { email: newEmail },
    });

    if (existingUser) {
      return toActionState(
        "ERROR",
        "This email is already registered",
        formData,
      );
    }

    // Send verification code via Inngest
    await inngest.send({
      name: "app/account.email-change",
      data: {
        userId: user.id,
        newEmail,
      },
    });

    return toActionState(
      "SUCCESS",
      `Verification code sent to ${newEmail}. Please check your inbox.`,
    );
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }
};

export default requestEmailChange;
