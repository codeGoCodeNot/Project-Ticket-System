import CardCompact from "@/components/card-compact";
import getAuth from "@/features/auth/queries/get-auth";
import isOwner from "@/features/auth/utils/is-owner";
import TicketUpsertForm from "@/features/ticket/components/ticket-upsert-form";
import getTicket from "@/features/ticket/queries/get-ticket";
import { notFound } from "next/navigation";

type TicketEditPageProps = {
  params: Promise<{ ticketId: string }>;
};

const TicketEditPage = async ({ params }: TicketEditPageProps) => {
  const { user } = await getAuth();
  const { ticketId } = await params;
  const ticket = await getTicket(ticketId);

  const isTicketNotFound = !!ticket;
  const isTicketOwner = isOwner(user, ticket);

  if (!isTicketNotFound || !isTicketOwner) {
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
