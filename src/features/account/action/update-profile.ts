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
import { accountProfilePath } from "@/path";

const updateUserSchema = z.object({
  username: z
    .string()
    .min(1)
    .max(191)
    .refine(
      (value) => !value.includes(" "),
      "Username must not contain spaces",
    ),

  email: z
    .string()
    .min(1)
    .max(191)
    .refine((value) => !value.includes(" "), "Email must not contain spaces"),
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
    if (!isOwner) return toActionState("ERROR", "Not Authorized", formData);

    if (dbUser.username === username && dbUser.email === email)
      return toActionState("ERROR", "No action change");

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        username,
        email,
      },
    });
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

  revalidatePath(accountProfilePath());

  return toActionState("SUCCESS", "User updated");
};

export default updateProfile;
