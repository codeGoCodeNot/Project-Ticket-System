import CardCompact from "@/components/card-compact";
import getTicket from "@/features/queries/get-ticket";
import TicketUpsertForm from "@/features/ticket/components/ticket-upsert-form";
import { notFound } from "next/navigation";

type TicketEditPageProps = {
  params: Promise<{ ticketId: string }>;
};

const TicketEditPage = async ({ params }: TicketEditPageProps) => {
  const { ticketId } = await params;
  const ticket = await getTicket(ticketId);

  if (!ticket) {
    notFound();
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <CardCompact
        title="Edit ticket"
        desc="Edit an existing ticket"
        classname="w-full max-w-[420px] animate-fade-from-top"
        content={<TicketUpsertForm ticket={ticket} />}
      />
    </div>
  );
};

export default TicketEditPage;
