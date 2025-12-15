import Heading from "@/components/heading";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { initialTickets } from "@/data";
import { ticketPath } from "@/path";

import { LucideCircleCheck, LucideFileText, LucidePencil } from "lucide-react";
import Link from "next/link";

const TICKET_ICONS = {
  OPEN: <LucideFileText />,
  DONE: <LucideCircleCheck />,
  IN_PROGRESS: <LucidePencil />,
};

// This is a tickets page
const TicketsPage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="Tickets" desc="All your tickets at one place" />
      <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-from-top">
        {initialTickets.map((ticket) => (
          <Card key={ticket.id} className="w-full max-w-[420px]">
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
        ))}
      </div>
    </div>
  );
};

export default TicketsPage;
