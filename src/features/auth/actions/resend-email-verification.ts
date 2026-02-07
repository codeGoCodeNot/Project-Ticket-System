"use server";

import fromErrorToActionState, {
  ActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { sendEmailVerification } from "../emails/sent-email-verification";
import getAuthOrRedirect from "../queries/get-auth-or-redirect";
import generateEmailVerificationCode from "../utils/generate-email-verification-code";

const resendEmailVerification = async (_actionState: ActionState) => {
  try {
    const { user } = await getAuthOrRedirect({
      checkEmailVerified: false,
    });

    // Generate new code
    const verificationCode = await generateEmailVerificationCode(
      user.id,
      user.email,
    );

    // Send email
    await sendEmailVerification(user.username, user.email, verificationCode);

    return toActionState("SUCCESS", "Verification code sent to your email!");
  } catch (error) {
    return fromErrorToActionState(error, new FormData());
  }
};

export default resendEmailVerification;
