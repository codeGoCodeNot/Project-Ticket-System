import EmailInvitation from "@/emails/invitation/email-invitation";
import { resend } from "@/lib/resend";

const sentEmailInvitation = async (
  username: string,
  organizationName: string,
  email: string,
  emailInvitationLink: string,
) => {
  return await resend.emails.send({
    from: "invitation@tickethub.johnsenb.dev",
    to: email,
    subject: "Invitation to join " + organizationName + " on TicketHub",
    react: (
      <EmailInvitation
        fromUser={username}
        fromOrganization={organizationName}
        url={emailInvitationLink}
      />
    ),
  });
};

export default sentEmailInvitation;
