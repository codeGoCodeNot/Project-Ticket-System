"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import deleteTicket from "@/features/actions/delete-ticket";
import { ticketPath } from "@/path";
import clsx from "clsx";
import { LucideSquareArrowOutUpRight, LucideTrash2 } from "lucide-react";
import Link from "next/link";
import { Ticket } from "../../../../generated/prisma/client";
import { TICKET_ICONS } from "../constant";

type TicketItemProps = {
  ticket: Ticket;
  isDetail?: boolean;
};

const TicketItem = ({ ticket, isDetail }: TicketItemProps) => {
  const detailButton = (
    <Button asChild variant="outline" size="icon">
      <Link href={ticketPath(ticket.id)}>
        <LucideSquareArrowOutUpRight className="h-4 w-4" />
      </Link>
    </Button>
  );

  const handleDeleteClick = async () => {
    await deleteTicket(ticket.id);
  };

  const deleteButton = (
    <Button variant="outline" size="icon" onClick={handleDeleteClick}>
      <LucideTrash2 className="h-4 w-4" />
    </Button>
  );

  return (
    <div
      className={clsx("w-full flex gap-x-1", {
        "max-w-[580px]": isDetail,
        "max-w-[420px]": !isDetail,
      })}
    >
      <Card className="w-full ">
        <CardHeader>
          <CardTitle className="flex gap-x-2 items-center">
            <span>{TICKET_ICONS[ticket.status]}</span>
            <span>{ticket.title}</span>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <span
            className={clsx("whitespace-break-spaces", {
              "line-clamp-3": !isDetail,
            })}
          >
            {ticket.content}
          </span>
        </CardContent>
      </Card>
      <div className="flex flex-col gap-y-1">
        {isDetail ? deleteButton : detailButton}
      </div>
    </div>
  );
};

export default TicketItem;
