"use server";

import { setCookieByKey } from "@/actions/cookies";
import fromErrorToActionState, {
  ActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import getAuthOrRedirect from "@/features/auth/queries/get-auth-or-redirect";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { z } from "zod";
import { signInPath } from "@/path";

const verifyEmailChangeSchema = z.object({
  code: z.string().length(8, "Code must be 8 characters"),
});

const verifyEmailChange = async (
  _actionState: ActionState,
  formData: FormData,
) => {
  try {
    const { user } = await getAuthOrRedirect();

    const { code } = verifyEmailChangeSchema.parse(
      Object.fromEntries(formData),
    );

    // Find the email change verification token
    const token = await prisma.emailVerificationToken.findFirst({
      where: {
        userId: user.id,
        code,
      },
    });

    if (!token) {
      return toActionState("ERROR", "Invalid verification code", formData);
    }

    // Check if expired
    if (Date.now() > token.expiresAt.getTime()) {
      await prisma.emailVerificationToken.delete({
        where: { id: token.id },
      });
      return toActionState("ERROR", "Verification code has expired", formData);
    }

    // Update user email
    await prisma.user.update({
      where: { id: user.id },
      data: {
        email: token.email,
        emailVerified: true,
      },
    });

    // Delete the verification token
    await prisma.emailVerificationToken.delete({
      where: { id: token.id },
    });

    // Invalidate all sessions for security
    await prisma.session.deleteMany({
      where: { userId: user.id },
    });

    await setCookieByKey(
      "toast",
      "Email updated successfully! Please sign in again.",
    );
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  redirect(signInPath());
};

export default verifyEmailChange;
