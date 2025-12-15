"use client";

import Heading from "@/components/heading";
import getTickets from "@/features/queries/get-tickets";
import TicketItem from "@/features/ticket/components/ticket-item";
import { Ticket } from "@/features/ticket/types";
import { useEffect, useState } from "react";

// This is a tickets page
const TicketsPage = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const fetchTickets = async () => {
      const result = await getTickets();
      setTickets(result);
    };

    fetchTickets();
  }, []);

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="Tickets" desc="All your tickets at one place" />
      <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-from-top">
        {tickets.map((ticket) => (
          <TicketItem ticket={ticket} key={ticket.id} />
        ))}
      </div>
    </div>
  );
};

export default TicketsPage;
