import Placeholder from "@/components/placeholder";
import getTickets from "@/features/ticket/queries/get-tickets";
import { ParsedSearchParams } from "../search-params";
import TicketItem from "./ticket-item";
import TicketSearchInputProps from "./ticket-search-input";
import TicketSortSelect from "./ticket-sort-select";

type TicketListProps = {
  userId?: string;
  searchParams: ParsedSearchParams;
};

const TicketList = async ({ userId, searchParams }: TicketListProps) => {
  const tickets = await getTickets(userId, searchParams);

  return (
    <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-from-top">
      <div className="w-full max-w-[420px] flex gap-x-2">
        <TicketSearchInputProps placeholder="Search tickets..." />
        <TicketSortSelect
          options={[
            {
              sortKey: "createdAt",
              sortValue: "desc",
              label: "Newest",
            },
            {
              sortKey: "createdAt",
              sortValue: "asc",
              label: "Oldest",
            },
            {
              sortKey: "deadline",
              sortValue: "asc",
              label: "Earliest Deadline",
            },
            {
              sortKey: "bounty",
              sortValue: "desc",
              label: "Bounty",
            },
          ]}
        />
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
