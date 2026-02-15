import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { fr } from "date-fns/locale";

type EmailInvitationProps = {
  fromUser: string;
  fromOrganization: string;
  url: string;
};

const EmailInvitation = ({
  fromUser,
  fromOrganization,
  url,
}: EmailInvitationProps) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="font-sans text-center">
          <Container>
            <Section>
              <Text>
                Hello there, {fromUser} invited you to join {fromOrganization}.
                Click the link below to accept the invitation.
              </Text>
            </Section>
            <Section>
              <Button
                href={url}
                className="bg-black rounded text-white p-2 m-2"
              >
                Accept Invitation
              </Button>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

EmailInvitation.previewProps = {
  fromUser: "Johnsen Berdin",
  fromOrganization: "Berdin Inc.",
  url: "http://localhost:3000/email-invitation/berdin123",
};

export default EmailInvitation;
