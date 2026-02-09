"use server";

import fromErrorToActionState, {
  ActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { inngest } from "@/lib/inngest";
import getAuthOrRedirect from "../queries/get-auth-or-redirect";

const resendEmailVerification = async (_actionState: ActionState) => {
  const { user } = await getAuthOrRedirect({
    checkEmailVerified: false,
    checkOrganization: false,
  });
  try {
    // Queue through Inngest (same as sign-up)
    await inngest.send({
      name: "app/auth.sign-up",
      data: {
        userId: user.id,
      },
    });

    return toActionState("SUCCESS", "Verification code sent to your email!");
  } catch (error) {
    return fromErrorToActionState(error, new FormData());
  }
};

export default resendEmailVerification;
