import getAuthOrRedirect from "@/features/auth/queries/get-auth-or-redirect";
import prisma from "@/lib/prisma";

const getOrganizationById = async (organizationId: string) => {
  const { user } = await getAuthOrRedirect();

  return prisma.organization.findFirst({
    where: {
      id: organizationId,
      memberships: {
        some: {
          userId: user.id,
        },
      },
    },
    select: {
      id: true,
      name: true,
    },
  });
};

export default getOrganizationById;
