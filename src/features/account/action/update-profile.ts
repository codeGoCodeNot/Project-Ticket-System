"use server";

import fromErrorToActionState, {
  ActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import z from "zod";
import { Prisma } from "../../../../generated/prisma/client";
import getAuthOrRedirect from "@/features/auth/queries/get-auth-or-redirect";
import prisma from "@/lib/prisma";
import isOwner from "@/features/auth/utils/is-owner";
import { revalidatePath } from "next/cache";
import { accountProfilePath, accountVerifyEmailPath } from "@/path";
import { inngest } from "@/lib/inngest";
import { redirect } from "next/navigation";
import { setCookieByKey } from "@/actions/cookies";

const updateUserSchema = z.object({
  username: z
    .string()
    .min(1)
    .max(191)
    .refine(
      (value) => !value.includes(" "),
      "Username must not contain spaces",
    ),

  email: z.string().min(1).max(191).email("Invalid email address"),
});

const updateProfile = async (_actionState: ActionState, formData: FormData) => {
  try {
    const { username, email } = updateUserSchema.parse(
      Object.fromEntries(formData),
    );

    const { user } = await getAuthOrRedirect();

    const dbUser = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });

    if (!dbUser) return toActionState("ERROR", "User not found", formData);
    if (!isOwner(user, { userId: dbUser.id }))
      return toActionState("ERROR", "Not Authorized", formData);

    const usernameChanged = dbUser.username !== username;
    const emailChanged = dbUser.email.toLowerCase() !== email.toLowerCase();

    if (!usernameChanged && !emailChanged) {
      return toActionState("ERROR", "No changes detected", formData);
    }

    // Handle email change separately with verification
    if (emailChanged) {
      console.log("Email change requested. Old:", dbUser.email, "New:", email);

      // Check if email is already taken
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        console.log("Email already exists");
        return toActionState("ERROR", "Email is already registered", formData);
      }

      console.log("Sending Inngest event for email change");

      // Send verification code via Inngest
      await inngest.send({
        name: "app/account.email-change",
        data: {
          userId: user.id,
          newEmail: email,
        },
      });

      console.log("Inngest event sent successfully");

      // Update username if it changed, but not email yet
      if (usernameChanged) {
        await prisma.user.update({
          where: { id: user.id },
          data: { username },
        });

        revalidatePath(accountProfilePath());
      }

      await setCookieByKey(
        "toast",
        `Verification code sent to ${email}. Please check your inbox to verify your new email.`,
      );

      redirect(accountVerifyEmailPath());
    } else {
      // Only username changed
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          username,
        },
      });

      revalidatePath(accountProfilePath());

      return toActionState("SUCCESS", "Profile updated successfully", formData);
    }
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return toActionState(
        "ERROR",
        "Either email or username is already in use",
        formData,
      );
    }
    return fromErrorToActionState(error, formData);
  }
};

export default updateProfile;
