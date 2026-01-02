import getTickets from "@/features/ticket/queries/get-tickets";
import TicketItem from "./ticket-item";

type TicketListProps = {
  userId?: string;
};

const TicketList = async ({ userId }: TicketListProps) => {
  const tickets = await getTickets(userId);

  return (
    <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-from-top">
      {tickets.map((ticket) => (
        <TicketItem ticket={ticket} key={ticket.id} />
      ))}
    </div>
  );
};

export default TicketList;
