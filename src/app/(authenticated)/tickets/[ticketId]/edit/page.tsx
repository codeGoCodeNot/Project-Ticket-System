import Breadcrumbs from "@/components/breadcrumbs";
import CardCompact from "@/components/card-compact";
import TicketUpsertForm from "@/features/ticket/components/ticket-upsert-form";
import getTicket from "@/features/ticket/queries/get-ticket";
import { homePath, ticketPath } from "@/path";

import { notFound } from "next/navigation";

type TicketEditPageProps = {
  params: Promise<{ ticketId: string }>;
};

const TicketEditPage = async ({ params }: TicketEditPageProps) => {
  const { ticketId } = await params;
  const ticket = await getTicket(ticketId);

  const isTicketNotFound = !!ticket;

  if (!isTicketNotFound || !ticket.permissions.canUpdateTicket) {
    notFound();
  }

  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <Breadcrumbs
        breadcrumbs={[
          { title: "Tickets", href: homePath() },
          { title: ticket.title, href: ticketPath(ticket.id) },
          { title: "Edit" },
        ]}
      />

      <div className="flex-1 flex flex-col items-center justify-center">
        <CardCompact
          title="Edit ticket"
          desc="Edit an existing ticket"
          classname="w-full max-w-[420px] animate-fade-from-top"
          content={<TicketUpsertForm ticket={ticket} />}
        />
      </div>
    </div>
  );
};

export default TicketEditPage;
