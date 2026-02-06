"use server";

import fromErrorToActionState, {
  ActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { inngest } from "@/lib/inngest";
import prisma from "@/lib/prisma";
import z from "zod";

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

    await inngest.send({
      name: "app/password.password-reset",
      data: { userId: user.id },
    });
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  return toActionState("SUCCESS", "Password reset email sent", formData);
};

export default passwordForgot;
