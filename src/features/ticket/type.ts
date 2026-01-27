import { Prisma } from "../../../generated/prisma/browser";

export type TicketWithMetaData = Prisma.TicketGetPayload<{
  include: {
    user: {
      select: {
        username: true;
      };
    };
  };
}>;

export type SearchParams = {
  search: string | undefined | string[];
  sort: string | undefined | string[];
};
