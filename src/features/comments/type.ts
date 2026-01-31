import { Prisma } from "../../../generated/prisma/client";

export type CommentWithMetaData = Prisma.CommentGetPayload<{
  include: { user: { select: { username: true } } };
}> & {
  isOwner: boolean;
};
