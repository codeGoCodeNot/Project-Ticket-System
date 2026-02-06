import { resend } from "@/lib/resend";
import EmailWelcome from "@/emails/auth/email-welcome";
import { signInPath } from "@/path";

export const sendEmailWelcome = async (username: string, email: string) => {
  const loginUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}${signInPath()}`;

  return await resend.emails.send({
    from: "noreply@johnsenb.dev",
    to: email,
    subject: "Welcome to TicketHub!",
    react: <EmailWelcome toName={username} loginUrl={loginUrl} />,
  });
};
