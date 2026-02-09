import getAuth from "@/features/auth/queries/get-auth";
import prisma from "@/lib/prisma";

const getOrganizationsByUser = async () => {
  const { user } = await getAuth();

  if (!user) return [];

  const organizations = prisma.organization.findMany({
    where: {
      memberships: {
        some: {
          userId: user.id,
        },
      },
    },
    include: {
      memberships: true,
    },
  });

  return organizations;
};

export default getOrganizationsByUser;
