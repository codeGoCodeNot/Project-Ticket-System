"use server";

import fromErrorToActionState, {
  ActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import prisma from "@/lib/prisma";
import z from "zod";
import generatePasswordResetLink from "../utils/generate-password-reset-link";

const passwordForgotSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).max(191),
});

const passwordForgot = async (
  _actionState: ActionState,
  formData: FormData,
) => {
  try {
    const { email } = passwordForgotSchema.parse(Object.fromEntries(formData));

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return toActionState("ERROR", "Incorrect username/email", formData);
    }

    const passwordResetLink = await generatePasswordResetLink(user.id);
    console.log(passwordResetLink);
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  return toActionState("SUCCESS", "Password reset email sent", formData);
};

export default passwordForgot;
