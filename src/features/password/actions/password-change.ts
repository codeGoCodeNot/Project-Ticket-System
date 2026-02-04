"use server";

import fromErrorToActionState, {
  ActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import getAuthOrRedirect from "@/features/auth/queries/get-auth-or-redirect";
import z from "zod";
import zxcvbn from "zxcvbn";
import { hashPassword, verifyPasswordHash } from "../utils/hash-and-verify";

import { ticketsPath } from "@/path";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { setCookieByKey } from "@/actions/cookies";

const passwordChangeSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, "Password must not be less than 6 characters")
      .max(191),
    newPassword: z
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
    confirmNewPassword: z
      .string()
      .min(6, "Password must not be less than 6 characters")
      .max(191),
  })
  .superRefine(({ newPassword, confirmNewPassword }, ctx) => {
    if (newPassword !== confirmNewPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmNewPassword"],
      });
    }
  });

const passwordChange = async (
  _actionState: ActionState,
  formData: FormData,
) => {
  const auth = await getAuthOrRedirect();

  try {
    const { currentPassword, newPassword } = passwordChangeSchema.parse(
      Object.fromEntries(formData),
    );

    const validPassword = await verifyPasswordHash(
      auth.user.passwordHash,
      currentPassword,
    );

    if (!validPassword)
      return toActionState("ERROR", "Incorrect password", formData);

    const isSamePassword = await verifyPasswordHash(
      auth.user.passwordHash,
      newPassword,
    );

    if (isSamePassword)
      return toActionState(
        "ERROR",
        "New password must be different from the current password",
        formData,
      );

    const newPasswordHash = await hashPassword(newPassword);

    await prisma.user.update({
      where: { id: auth.user.id },
      data: {
        passwordHash: newPasswordHash,
      },
    });
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  await setCookieByKey("toast", "Password changed successfully");
  redirect(ticketsPath());
};

export default passwordChange;
