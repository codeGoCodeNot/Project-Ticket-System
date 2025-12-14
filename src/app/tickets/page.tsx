import { initialTickets } from "@/data";
import { ticketPath } from "@/path";
import Link from "next/link";

// This is a tickets page
const TicketsPage = () => {
  return (
    <div>
      <h2>
        {initialTickets.map((ticket) => (
          <div key={ticket.id}>
            <h2 className="text-lg">{ticket.title}</h2>
            <Link href={ticketPath(ticket.id)} className="text-sm underline">
              View
            </Link>
          </div>
        ))}
      </h2>
    </div>
  );
};

export default TicketsPage;
