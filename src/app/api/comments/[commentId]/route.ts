import getComment from "@/features/comments/queries/get-comment";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ commentId: string }> },
) {
  const { commentId } = await params;
  const comment = await getComment(commentId);

  return Response.json(comment);
}
