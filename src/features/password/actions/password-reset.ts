"use server";

import { setCookieByKey } from "@/actions/cookies";
import fromErrorToActionState, {
  ActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import prisma from "@/lib/prisma";
import { signInPath } from "@/path";
import { hashToken } from "@/utils/crypto";
import { redirect } from "next/navigation";

import z from "zod";
import { hashPassword } from "../utils/hash-and-verify";
import zxcvbn from "zxcvbn";

const passwordResetSchema = z
  .object({
    password: z
      .string()
      .min(6, "Password must not be less than 6 characters")
      .max(191)
      .refine(
        (password) => {
          const result = zxcvbn(password);
          return result.score >= 2;
        },
        {
          message: "Password is too weak. Please choose a stronger password.",
        },
      ),
    confirmPassword: z
      .string()
      .min(6, "Password must not be less than 6 characters")
      .max(191),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

const passwordReset = async (
  tokenId: string,
  _actionState: ActionState,
  formData: FormData,
) => {
  try {
    const { password } = passwordResetSchema.parse(
      Object.fromEntries(formData),
    );

    const tokenHash = hashToken(tokenId);

    const passwordResetToken = await prisma.passwordResetToken.findUnique({
      where: { tokenHash },
    });

    if (passwordResetToken) {
      await prisma.passwordResetToken.deleteMany({
        where: { tokenHash },
      });
    }

    if (
      !passwordResetToken ||
      Date.now() > passwordResetToken.expiresAt.getTime()
    ) {
      return toActionState(
        "ERROR",
        "Expired or invalid verification token",
        formData,
      );
    }

    const passwordHash = await hashPassword(password);

    await prisma.user.update({
      where: { id: passwordResetToken.userId },
      data: { passwordHash },
    });
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  await setCookieByKey("toast", "Password has been reset successfully");
  redirect(signInPath());
};

export default passwordReset;
