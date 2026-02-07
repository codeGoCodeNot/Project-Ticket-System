import EmailVerification from "@/emails/auth/email-verification";
import { resend } from "@/lib/resend";

export const sendEmailVerification = async (
  username: string,
  email: string,
  verificationCode: string,
) => {
  return await resend.emails.send({
    from: "support@tickethub.johnsenb.dev",
    to: email,
    subject: "Email Verification Request from TicketHub",
    react: <EmailVerification toName={username} url={verificationCode} />,
  });
};
