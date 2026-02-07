import { Section, Text } from "@react-email/components";
import { EmailHeading } from "../components/email-heading";
import { EmailLayout, mutedColor } from "../components/email-layout";

type EmailChangeProps = {
  toName: string;
  code: string;
};

const EmailChange = ({ toName, code }: EmailChangeProps) => {
  return (
    <EmailLayout previewText="Verify your new email address">
      <EmailHeading
        title="Email Change Request"
        subtitle="Use the code below to verify your new email address"
      />

      <Section
        style={{ textAlign: "center", marginBottom: "24px", marginTop: "24px" }}
      >
        <Text>Hello {toName}, you requested to change your email address.</Text>
        <Text style={{ margin: "16px 0" }}>Here's your verification code:</Text>
        <Text
          style={{ fontSize: "32px", fontWeight: "bold", margin: "16px 0" }}
        >
          {code}
        </Text>
        <Text style={{ margin: "16px 0", fontSize: "14px", color: mutedColor }}>
          This code will expire in 1 hour.
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
          Didn't request this? Please ignore this email or contact support if
          you have concerns.
        </Text>
      </Section>
    </EmailLayout>
  );
};

EmailChange.PreviewProps = {
  toName: "Johnsen Berdin",
  code: "CMDLNEJH",
};

export default EmailChange;
