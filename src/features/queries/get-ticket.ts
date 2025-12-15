import { initialTickets } from "@/data";
import { Ticket } from "../ticket/types";

const getTicket = async (ticketId: string): Promise<Ticket | null> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const maybeTicket = initialTickets.find((ticket) => ticketId === ticket.id);

  return new Promise((resolve) => {
    resolve(maybeTicket || null);
  });
};

export default getTicket;
