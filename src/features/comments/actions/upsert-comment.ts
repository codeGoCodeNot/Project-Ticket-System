"use server";

import fromErrorToActionState, {
  ActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import getAuthOrRedirect from "@/features/auth/queries/get-auth-or-redirect";
import prisma from "@/lib/prisma";
import { ticketPath } from "@/path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";

const upsertCommentSchema = z.object({
  content: z
    .string()
    .min(1, "Content is required")
    .max(1024, "Content is too long"),
});

const upsertComment = async (
  ticketId: string,
  commentId: string,
  _actionState: ActionState,
  formData: FormData,
) => {
  const { user } = await getAuthOrRedirect();

  try {
    const data = upsertCommentSchema.parse(Object.fromEntries(formData));

    await prisma.comment.upsert({
      where: { id: commentId },
      update: {
        ...data,
      },
      create: {
        userId: user.id,
        ticketId,
        ...data,
      },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath(ticketPath(ticketId));

  if (commentId) {
    redirect(ticketPath(ticketId));
  }

  return toActionState(
    "SUCCESS",
    commentId ? "Comment updated successfully" : "Comment created successfully",
  );
};

export default upsertComment;
