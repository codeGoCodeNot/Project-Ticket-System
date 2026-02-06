import { Section, Text } from "@react-email/components";
import { EmailLayout, textColor, mutedColor } from "../components/email-layout";
import { EmailButton } from "../components/email-button";
import { EmailHeading } from "../components/email-heading";

type EmailPasswordResetProps = {
  toName: string;
  url: string;
};

const EmailPasswordReset = ({ toName, url }: EmailPasswordResetProps) => {
  return (
    <EmailLayout previewText="Reset your password">
      <EmailHeading
        title="Reset Your Password"
        subtitle="Click below to reset your password. This link expires in 1 hour."
      />

      {/* Main action button */}
      <Section
        style={{ textAlign: "center", marginBottom: "24px", marginTop: "24px" }}
      >
        <EmailButton href={url}>Reset Password</EmailButton>
      </Section>

      {/* Security notice */}
      <Section style={{ textAlign: "center" }}>
        <Text
          style={{
            margin: "0",
            fontSize: "12px",
            color: mutedColor,
          }}
        >
          Didn't request this? Ignore this email.
        </Text>
      </Section>
    </EmailLayout>
  );
};

EmailPasswordReset.PreviewProps = {
  toName: "Johnsen Berdin",
  url: "http://localhost:3000/password-reset/abc123xyz789",
};

export default EmailPasswordReset;
