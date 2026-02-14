"use client";

import useConfirmDialog from "@/components/confirm-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import deleteTickets from "@/features/ticket/actions/delete-ticket";
import updateTicketStatus from "@/features/ticket/actions/update-ticket-status";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LucideTrash2 } from "lucide-react";
import { toast } from "sonner";
import { TicketStatus } from "../../../../generated/prisma/client";
import { TICKET_STATUS_LABELS } from "../constant";
import { TicketWithMetaData } from "../type";

type TicketMoreMenuProps = {
  ticket: TicketWithMetaData;
  trigger: React.ReactNode;
};

const TicketMoreMenu = ({ ticket, trigger }: TicketMoreMenuProps) => {
  const canDeleteTicket = ticket.permissions.canDeleteTicket;
  const noDeletePermissionMessage =
    "You do not have permission to delete this ticket.";

  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: deleteTickets.bind(null, ticket.id),
    trigger: (
      <DropdownMenuItem>
        <LucideTrash2 className="h-4 w-4" />
        <span>Delete</span>
      </DropdownMenuItem>
    ),
  });

  const handleUpdateTicketStatus = async (value: string) => {
    const promise = updateTicketStatus(ticket.id, value as TicketStatus);

    toast.promise(promise, {
      loading: "Updating status",
    });

    const result = await promise;

    if (result.status === "ERROR") {
      toast.error(result.message);
    } else if (result.status === "SUCCESS") {
      toast.success(result.message);
    }
  };

  const ticketStatusRadioGroupItems = (
    <DropdownMenuRadioGroup
      value={ticket.status}
      onValueChange={handleUpdateTicketStatus}
    >
      {(Object.keys(TICKET_STATUS_LABELS) as TicketStatus[]).map((key) => (
        <DropdownMenuRadioItem value={key} key={key}>
          {TICKET_STATUS_LABELS[key]}
        </DropdownMenuRadioItem>
      ))}
    </DropdownMenuRadioGroup>
  );

  return (
    <>
      {deleteDialog}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" side="right">
          {ticketStatusRadioGroupItems}
          <DropdownMenuSeparator />
          {canDeleteTicket ? (
            deleteButton
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="inline-flex w-full">
                  <DropdownMenuItem disabled>
                    <LucideTrash2 className="h-4 w-4" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </span>
              </TooltipTrigger>
              <TooltipContent side="left" sideOffset={8}>
                {noDeletePermissionMessage}
              </TooltipContent>
            </Tooltip>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default TicketMoreMenu;
