"use server";

import { setCookieByKey } from "@/actions/cookies";
import fromErrorToActionState, {
  ActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { createSession } from "@/lib/lucia";
import prisma from "@/lib/prisma";
import { ticketsPath } from "@/path";
import { generateRandomToken } from "@/utils/crypto";
import { redirect } from "next/navigation";
import z from "zod";
import getAuthOrRedirect from "../queries/get-auth-or-redirect";
import { setSessionCookie } from "../utils/session-cookie";
import { validateEmailVerificationCode } from "../utils/validate-email-verification-code";

const emailVerificationSchema = z.object({
  code: z.string().length(8),
});

const emailVerification = async (
  _actionState: ActionState,
  formData: FormData,
) => {
  const { user } = await getAuthOrRedirect({
    checkEmailVerified: false,
    checkOrganization: false,
    checkActiveOrganization: false,
  });

  try {
    const { code } = emailVerificationSchema.parse(
      Object.fromEntries(formData),
    );

    const validCode = await validateEmailVerificationCode(
      user.id,
      user.email,
      code,
    );

    if (!validCode)
      return toActionState("ERROR", "Invalid or expired verification code.");

    await prisma.session.deleteMany({
      where: {
        userId: user.id,
      },
    });

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        emailVerified: true,
      },
    });

    const sessionToken = generateRandomToken();
    const session = await createSession(sessionToken, user.id);

    await setSessionCookie(sessionToken, session.expiresAt);
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  await setCookieByKey("toast", "Email verified successfully!");
  redirect(ticketsPath());
};

export default emailVerification;
