import getAuth from "@/features/auth/queries/get-auth";
import isOwner from "@/features/auth/utils/is-owner";
import getActiveOrganization from "@/features/organization/queries/get-active-organization";
import getOrganizationsByUser from "@/features/organization/queries/get-organizations-by-user";
import prisma from "@/lib/prisma";
import { ParsedSearchParams } from "../search-params";

const getTickets = async (
  userId: string | undefined,
  byOrganization: boolean,
  searchParams: ParsedSearchParams,
) => {
  const { user } = await getAuth();
  const activeOrganization = await getActiveOrganization();

  // Use byOrganization prop if explicitly set, otherwise use filter from searchParams
  const filterByOrg = byOrganization || searchParams.filter === "active";

  const where = {
    userId,
    title: {
      contains: searchParams.search,
      mode: "insensitive" as const,
    },
    ...(filterByOrg && activeOrganization
      ? {
          organizationId: activeOrganization.id,
        }
      : {}),
  };

  const skip = searchParams.page * searchParams.size;
  const take = searchParams.size;

  const [tickets, count, totalCount] = await prisma.$transaction([
    prisma.ticket.findMany({
      where,
      skip,
      take,
      orderBy: {
        [searchParams.sortKey]: searchParams.sortValue,
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    }),
    prisma.ticket.count({
      where,
    }),
    prisma.ticket.count({
      where: {
        userId,
      },
    }),
  ]);

  const organizationsByUser = await getOrganizationsByUser();

  return {
    list: tickets.map((ticket) => {
      const organization = organizationsByUser.find(
        (org) => org.id === ticket.organizationId,
      );

      return {
        ...ticket,
        isOwner: isOwner(user, ticket),
        permissions: {
          canDeleteTicket:
            isOwner(user, ticket) &&
            !!organization?.membershipByUser.canDeleteTickets,
          canUpdateTicket:
            isOwner(user, ticket) &&
            !!organization?.membershipByUser.canUpdateTickets,
        },
      };
    }),
    metadata: {
      count,
      totalCount,
      hasNextPage: count > skip + take,
    },
  };
};

export default getTickets;
