import getAuthOrRedirect from "@/features/auth/queries/get-auth-or-redirect";
import prisma from "@/lib/prisma";

const getMemberships = async (organizationId: string) => {
  await getAuthOrRedirect();

  return await prisma.membership.findMany({
    where: { organizationId },
    include: {
      user: {
        select: {
          username: true,
          email: true,
          emailVerified: true,
        },
      },
    },
  });
};

export default getMemberships;
