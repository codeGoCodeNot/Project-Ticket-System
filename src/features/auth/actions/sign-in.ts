"use server";

import fromErrorToActionState, {
  ActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { verifyPasswordHash } from "@/features/password/utils/hash-and-verify";
import { createSession } from "@/lib/lucia";
import prisma from "@/lib/prisma";
import { ticketsPath } from "@/path";
import { generateRandomToken } from "@/utils/crypto";
import { redirect } from "next/navigation";
import z from "zod";
import { setSessionCookie } from "../utils/session-cookie";

const signInSchema = z.object({
  identifier: z
    .string()
    .min(1, { message: "Username or Email is required" })
    .max(191),
  password: z
    .string()
    .min(6, "Password must not be less than 6 characters")
    .max(191),
});

const signIn = async (_actionState: ActionState, formData: FormData) => {
  try {
    const { identifier, password } = signInSchema.parse(
      Object.fromEntries(formData),
    );

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ username: identifier }, { email: identifier }],
      },
    });

    if (!user) {
      return toActionState(
        "ERROR",
        "Incorrect username/email or password",
        formData,
      );
    }

    const validPassword = await verifyPasswordHash(user.passwordHash, password);

    if (!validPassword) {
      return toActionState(
        "ERROR",
        "Incorrect username/email or password",
        formData,
      );
    }

    const sessionToken = generateRandomToken();
    const session = await createSession(sessionToken, user.id);

    await setSessionCookie(sessionToken, session.expiresAt);
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  redirect(ticketsPath());
};

export default signIn;
