import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ticketPath } from "@/path";
import Link from "next/link";
import { TICKET_ICONS } from "../constant";
import { Ticket } from "../types";

type TicketItemProps = {
  ticket: Ticket;
};

const TicketItem = ({ ticket }: TicketItemProps) => {
  return (
    <Card className="w-full max-w-[420px]">
      <CardHeader>
        <CardTitle className="flex gap-x-2 items-center">
          <span>{TICKET_ICONS[ticket.status]}</span>
          <span>{ticket.title}</span>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <span className="line-clamp-3">{ticket.content}</span>
      </CardContent>
      <CardFooter>
        <Link href={ticketPath(ticket.id)} className="text-sm underline">
          View
        </Link>
      </CardFooter>
    </Card>
  );
};

export default TicketItem;
