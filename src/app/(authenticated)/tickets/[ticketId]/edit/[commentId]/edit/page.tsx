import Breadcrumbs from "@/components/breadcrumbs";
import CardCompact from "@/components/card-compact";
import { Separator } from "@/components/ui/separator";
import CommentUpsertForm from "@/features/comments/components/comment-upsert-form";
import getComment from "@/features/comments/queries/get-comment";
import getTicket from "@/features/ticket/queries/get-ticket";
import { homePath, ticketPath } from "@/path";
import notFound from "../../../not-found";

type CommentUpdatePageProps = {
  params: Promise<{ ticketId: string; commentId: string }>;
};
const CommentUpdatePage = async ({ params }: CommentUpdatePageProps) => {
  const { ticketId, commentId } = await params;

  const ticket = await getTicket(ticketId);

  if (!ticket) {
    return notFound();
  }

  const comment = await getComment(commentId);

  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <Breadcrumbs
        breadcrumbs={[
          { title: "Tickets", href: homePath() },
          { title: ticket.title, href: ticketPath(ticket.id) },
          { title: "Edit comment" },
        ]}
      />

      <Separator />

      <div className="flex-1 flex flex-col self-center w-full max-w-[580px]">
        <CardCompact
          title="Update Comment"
          desc=" An existing comment will be updated"
          content={
            <CommentUpsertForm
              ticketId={ticketId}
              commentId={commentId}
              content={comment?.content}
            />
          }
        />
      </div>
    </div>
  );
};

export default CommentUpdatePage;
