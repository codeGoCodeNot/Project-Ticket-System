import getTickets from "@/features/queries/get-tickets";
import TicketItem from "./ticket-item";

const TicketList = async () => {
  const tickets = await getTickets();

  return (
    <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-from-top">
      {tickets.map((ticket) => (
        <TicketItem ticket={ticket} key={ticket.id} />
      ))}
    </div>
  );
};

export default TicketList;
