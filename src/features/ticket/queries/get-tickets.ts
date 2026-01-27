import prisma from "@/lib/prisma";
import { ParsedSearchParams } from "../search-params";

const getTickets = async (
  userId: string | undefined,
  searchParams: ParsedSearchParams,
) => {
  console.log(searchParams.sort);

  return await prisma.ticket.findMany({
    where: {
      userId,
      title: {
        contains: searchParams.search,
        mode: "insensitive",
      },
    },
    orderBy: {
      ...(searchParams.sort === "newest" && { createAt: "desc" }),
      ...(searchParams.sort === "bounty" && { bounty: "desc" }),
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });
};

export default getTickets;
