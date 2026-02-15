import prisma from "@/lib/prisma";
import { emailInvitationPath } from "@/path";
import { generateRandomToken, hashToken } from "@/utils/crypto";
import getBaseUrl from "@/utils/url";

const generateInvitationLink = async (
  invitedByUserId: string,
  organizationId: string,
  email: string,
) => {
  await prisma.invitation.deleteMany({
    where: {
      email,
      organizationId,
    },
  });

  const tokenId = generateRandomToken();
  const tokenHash = hashToken(tokenId);

  await prisma.invitation.create({
    data: {
      tokenHash,
      email,
      organizationId,
      invitedByUserId,
    },
  });

  const pageUrl = getBaseUrl() + emailInvitationPath();
  const emailInvitationLink = pageUrl + `${tokenId}`;

  return emailInvitationLink;
};

export default generateInvitationLink;
