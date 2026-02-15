import { inngest } from "@/lib/inngest";
import prisma from "@/lib/prisma";
import sentEmailInvitation from "../emails/sent-email-invitation";

export type InvitationCreateEventArgs = {
  data: {
    organizationId: string;
    email: string;
    userId: string;
    emailInvitationLink: string;
  };
};

export const invitationCreateEvent = inngest.createFunction(
  { id: "invitation-create" },
  { event: "app/invitation.created" },
  async ({ event }) => {
    const { organizationId, email, userId, emailInvitationLink } = event.data;

    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    });

    const organization = await prisma.organization.findUniqueOrThrow({
      where: {
        id: organizationId,
      },
    });

    const result = await sentEmailInvitation(
      user.username,
      organization.name,
      email,
      emailInvitationLink,
    );

    if (result.error)
      throw new Error(`${result.error.name}: ${result.error.message}`);

    return {
      event,
      body: true,
    };
  },
);
