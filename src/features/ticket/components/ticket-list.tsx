import getTickets from "@/features/ticket/queries/get-tickets";
import TicketItem from "./ticket-item";
import SearchInput from "@/components/search-input";
import { SearchParams } from "../type";
import Placeholder from "@/components/placeholder";

type TicketListProps = {
  userId?: string;
  searchParams: SearchParams;
};

const TicketList = async ({ userId, searchParams }: TicketListProps) => {
  const tickets = await getTickets(userId, searchParams);

  return (
    <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-from-top">
      <div className="w-full max-w-[420px]">
        <SearchInput placeholder="Search tickets..." />
      </div>
      {tickets.length ? (
        tickets.map((ticket) => <TicketItem ticket={ticket} key={ticket.id} />)
      ) : (
        <Placeholder label="No tickets found" />
      )}
    </div>
  );
};

export default TicketList;
