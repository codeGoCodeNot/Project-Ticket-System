import getTicket from "@/features/ticket/queries/get-ticket";
import TicketItem from "@/features/ticket/components/ticket-item";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/breadcrumbs";
import { homePath } from "@/path";
import { Separator } from "@/components/ui/separator";
import getComments from "@/features/comments/queries/get-comments";
import Comments from "@/features/comments/components/comments";

// This is a ticket page
type TicketPageProps = {
  params: Promise<{ ticketId: string }>;
};

const TicketPage = async ({ params }: TicketPageProps) => {
  const { ticketId } = await params;
  const ticketPromise = getTicket(ticketId);
  const commentsPromise = getComments(ticketId);

  const [ticket, comments] = await Promise.all([
    ticketPromise,
    commentsPromise,
  ]);

  if (!ticket) {
    notFound();
  }

  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <Breadcrumbs
        breadcrumbs={[
          { title: "Tickets", href: homePath() },
          { title: ticket.title },
        ]}
      />

      <Separator />

      <div className="flex justify-center animate-fade-from-top">
        <TicketItem
          ticket={ticket}
          isDetail
          comments={<Comments ticketId={ticket.id} comments={comments} />}
        />
      </div>
    </div>
  );
};

export default TicketPage;
