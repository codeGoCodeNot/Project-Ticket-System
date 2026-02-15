import { Section, Text } from "@react-email/components";
import { EmailLayout, mutedColor } from "../components/email-layout";
import { EmailButton } from "../components/email-button";
import { EmailHeading } from "../components/email-heading";

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
    <EmailLayout previewText={`Invitation to join ${fromOrganization}`}>
      <EmailHeading
        title={`You're Invited to ${fromOrganization}`}
        subtitle={`Accept your invitation from ${fromUser}.`}
      />

      {/* Main action button */}
      <Section
        style={{ textAlign: "center", marginBottom: "24px", marginTop: "24px" }}
      >
        <EmailButton href={url}>Accept Invitation</EmailButton>
      </Section>

      {/* Info notice */}
      <Section style={{ textAlign: "center" }}>
        <Text style={{ margin: 0, fontSize: "12px", color: mutedColor }}>
          If you did not expect this invitation, you can ignore this email.
        </Text>
      </Section>
    </EmailLayout>
  );
};

EmailInvitation.previewProps = {
  fromUser: "Johnsen Berdin",
  fromOrganization: "Berdin Inc.",
  url: "http://localhost:3000/email-invitation/berdin123",
};

export default EmailInvitation;
