import { EmailLayout, textColor, mutedColor } from "../components/email-layout";
import { EmailHeading } from "../components/email-heading";

type EmailWelcomeProps = {
  toName: string;
  loginUrl: string;
};

const EmailWelcome = ({ toName, loginUrl }: EmailWelcomeProps) => {
  return (
    <EmailLayout previewText={`Welcome to TicketHub`}>
      <EmailHeading
        title={`Welcome, ${toName}`}
        subtitle="Your account is ready to use."
      />
    </EmailLayout>
  );
};

EmailWelcome.PreviewProps = {
  toName: "Jane Doe",
  loginUrl: "http://localhost:3000/sign-in",
};

export default EmailWelcome;
