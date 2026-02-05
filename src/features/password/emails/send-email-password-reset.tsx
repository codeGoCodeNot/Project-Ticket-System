import { resend } from "@/lib/resend";
import EmailPasswordReset from "@/emails/password/email-password-reset";

export const sendEmailPasswordReset = async (
  username: string,
  email: string,
  passwordResetLink: string,
) => {
  return await resend.emails.send({
    from: "no-reply@tickethub.johnsenb.dev",
    to: email,
    subject: "Password Reset Request from TicketHub",
    react: <EmailPasswordReset toName={username} url={passwordResetLink} />,
  });
};
