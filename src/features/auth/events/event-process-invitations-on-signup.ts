import { inngest } from "@/lib/inngest";
import prisma from "@/lib/prisma";

export const processInvitationsOnSignUp = inngest.createFunction(
  { id: "process-invitations-on-sign-up" },
  { event: "app/auth.sign-up" },
  async ({ event }) => {
    const { userId } = event.data;
    if (!userId) return;

    // Find user by id to get email
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return;

    // Find invitations for this email
    const invitations = await prisma.invitation.findMany({
      where: { email: user.email },
    });
    if (!invitations.length) return;

    // Create memberships and delete invitations
    await prisma.$transaction([
      prisma.invitation.deleteMany({ where: { email: user.email } }),
      prisma.membership.createMany({
        data: invitations.map((invitation) => ({
          organizationId: invitation.organizationId,
          userId: user.id,
          membershipRole: "MEMBER",
          isActive: false,
        })),
      }),
    ]);
  },
);
