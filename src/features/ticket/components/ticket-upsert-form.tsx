"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import upsertTicket from "@/features/actions/upsert-ticket";
import { Label } from "@radix-ui/react-label";
import { LucideLoaderCircle } from "lucide-react";
import { useActionState } from "react";
import { Ticket } from "../../../../generated/prisma/client";
import FieldError from "@/components/form/field-error";

type TicketUpsertFormProps = {
  ticket?: Ticket;
};

const TicketUpsertForm = ({ ticket }: TicketUpsertFormProps) => {
  const [actionState, action, isPending] = useActionState(
    upsertTicket.bind(null, ticket?.id),
    {
      message: "",
      fieldErrors: {},
    }
  );

  return (
    <form action={action} className="flex flex-col gap-y-2">
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
      <Button disabled={isPending} type="submit">
        {isPending && <LucideLoaderCircle className="h-4 w-4 animate-spin" />}
        {ticket ? "Edit" : "Create"}
      </Button>
      {actionState.message}
    </form>
  );
};

export default TicketUpsertForm;
