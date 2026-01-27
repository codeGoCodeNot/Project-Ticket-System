import prisma from "@/lib/prisma";
import { SearchParams } from "../type";

const getTickets = async (
  userId: string | undefined,
  searchParams: SearchParams,
) => {
  console.log(searchParams.sort);

  return await prisma.ticket.findMany({
    where: {
      userId,
      ...(typeof searchParams.search === "string" && {
        title: {
          contains: searchParams.search,
          mode: "insensitive",
        },
      }),
    },
    orderBy: {
      ...(searchParams.sort === undefined && { createAt: "desc" }),
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
