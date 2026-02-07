import { Section, Text } from "@react-email/components";
import { EmailHeading } from "../components/email-heading";
import { EmailLayout, mutedColor } from "../components/email-layout";

type EmailVerificationProps = {
  toName: string;
  url: string;
};

const EmailVerification = ({ toName, url }: EmailVerificationProps) => {
  return (
    <EmailLayout previewText="Verify your email">
      <EmailHeading
        title="Verify Your Email"
        subtitle="Use the code below to verify your email address"
      />

      <Section
        style={{ textAlign: "center", marginBottom: "24px", marginTop: "24px" }}
      >
        <Text>Hello {toName}, here's your verification code:</Text>
        <Text
          style={{ fontSize: "32px", fontWeight: "bold", margin: "16px 0" }}
        >
          {url}
        </Text>
      </Section>

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

EmailVerification.PreviewProps = {
  toName: "Johnsen Berdin",
  url: "CMDLNEJH",
};

export default EmailVerification;
