import getAuthOrRedirect from "@/features/auth/queries/get-auth-or-redirect";
import prisma from "@/lib/prisma";

type GetMembershipParams = {
  organizationId: string;
  userId: string;
};

const getMembership = async ({
  organizationId,
  userId,
}: GetMembershipParams) => {
  await getAuthOrRedirect();

  return await prisma.membership.findUnique({
    where: {
      membershipId: {
        organizationId,
        userId,
      },
    },
  });
};

export default getMembership;
