"use server";

import fromErrorToActionState, {
  ActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import getAuthOrRedirect from "@/features/auth/queries/get-auth-or-redirect";
import z from "zod";
import { verifyPasswordHash } from "../utils/hash-and-verify";
import generatePasswordResetLink from "../utils/generate-password-reset-link";

const passwordChangeSchema = z.object({
  password: z
    .string()
    .min(6, "Password must not be less than 6 characters")
    .max(191),
});

const passwordChange = async (
  _actionState: ActionState,
  formData: FormData,
) => {
  const auth = await getAuthOrRedirect();
  try {
    const { password } = passwordChangeSchema.parse(
      Object.fromEntries(formData),
    );

    const validPassword = await verifyPasswordHash(
      auth.user.passwordHash,
      password,
    );

    if (!validPassword)
      return toActionState("ERROR", "Incorrect password", formData);

    const passwordResetLink = await generatePasswordResetLink(auth.user.id);
    console.log(passwordResetLink);
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  return toActionState(
    "SUCCESS",
    "Check your email for the password reset link",
    formData,
  );
};

export default passwordChange;
