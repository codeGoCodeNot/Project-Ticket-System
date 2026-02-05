import {
  Button,
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
} from "@react-email/components";

type EmailPasswordResetProps = {
  toName: string;
  url: string;
};

const EmailPasswordReset = ({ toName, url }: EmailPasswordResetProps) => {
  return (
    <Html>
      <Head />
      <Body
        style={{
          fontFamily: "sans-serif",
          margin: "32px",
          textAlign: "center",
        }}
      >
        <Container>
          <Section>
            <Text>
              Hello {toName}, you have requested to reset your password. Please
              click the button below to proceed.
            </Text>
          </Section>
          <Section>
            <Button
              href={url}
              style={{
                backgroundColor: "#000000",
                borderRadius: "4px",
                color: "#ffffff",
                padding: "8px",
                margin: "8px",
              }}
            >
              Reset Password
            </Button>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

EmailPasswordReset.PreviewProps = {
  toName: "Johnsen Berdin",
  url: "http://localhost:3000/password-reset/berdin123",
};

export default EmailPasswordReset;
