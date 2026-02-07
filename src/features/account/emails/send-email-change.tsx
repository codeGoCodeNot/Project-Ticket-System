import EmailChange from "@/emails/account/email-change";
import { resend } from "@/lib/resend";

export const sendEmailChange = async (
  username: string,
  newEmail: string,
  verificationCode: string,
) => {
  return await resend.emails.send({
    from: "support@tickethub.johnsenb.dev",
    to: newEmail,
    subject: "Verify Your New Email Address",
    react: <EmailChange toName={username} code={verificationCode} />,
  });
};
