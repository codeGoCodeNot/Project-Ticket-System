"use client";

import FieldError from "@/components/form/field-error";
import Form from "@/components/form/form";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import upsertTicket from "@/features/actions/upsert-ticket";
import { fromCent } from "@/utils/currency";
import { Label } from "@radix-ui/react-label";
import { LucideLoaderCircle } from "lucide-react";
import { useActionState } from "react";
import { Ticket } from "../../../../generated/prisma/client";
import DatePickerDemo from "@/components/date-picker";

type TicketUpsertFormProps = {
  ticket?: Ticket;
};

const TicketUpsertForm = ({ ticket }: TicketUpsertFormProps) => {
  const [actionState, action, isPending] = useActionState(
    upsertTicket.bind(null, ticket?.id),
    EMPTY_ACTION_STATE
  );

  return (
    <Form action={action} actionState={actionState}>
      <Label htmlFor="title">Title</Label>
      <Input
        type="text"
        id="title"
        name="title"
        defaultValue={
          (actionState.payload?.get("title") as string) ?? ticket?.title
        }
      />
      <FieldError actionState={actionState} name="title" />

      <Label htmlFor="content">Content</Label>
      <Textarea
        id="content"
        name="content"
        defaultValue={
          (actionState.payload?.get("content") as string) ?? ticket?.content
        }
      />
      <FieldError actionState={actionState} name="content" />

      <div className="flex gap-x-2 mb-1">
        <div className="w-1/2">
          <Label htmlFor="deadline">Deadline</Label>

          <DatePickerDemo
            key={actionState.timestamp}
            id="deadline"
            name="deadline"
            defaultValue={
              (actionState.payload?.get("deadline") as string) ??
              ticket?.deadline
            }
          />
          <FieldError actionState={actionState} name="deadline" />
        </div>
        <div className="w-1/2">
          <Label htmlFor="bounty">Bounty ($)</Label>
          <Input
            type="number"
            step="0.01"
            id="bounty"
            name="bounty"
            defaultValue={
              (actionState.payload?.get("bounty") as string) ??
              (ticket?.bounty ? fromCent(ticket?.bounty) : "")
            }
          />
          <FieldError actionState={actionState} name="bounty" />
        </div>
      </div>

      <Button disabled={isPending} type="submit">
        {isPending && <LucideLoaderCircle className="h-4 w-4 animate-spin" />}
        {ticket ? "Edit" : "Create"}
      </Button>
    </Form>
  );
};

export default TicketUpsertForm;
