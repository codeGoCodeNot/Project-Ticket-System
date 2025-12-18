import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import upsertTicket from "@/features/actions/upsert-ticket";
import { Label } from "@radix-ui/react-label";
import { Ticket } from "../../../../generated/prisma/client";
import SubmitButton from "@/components/form/submit-button";

type TicketUpsertFormProps = {
  ticket?: Ticket;
};

const TicketUpsertForm = ({ ticket }: TicketUpsertFormProps) => {
  return (
    <form
      action={upsertTicket.bind(null, ticket?.id)}
      className="
    flex flex-col gap-y-2
    "
    >
      <Label htmlFor="title">Title</Label>
      <Input type="text" id="title" name="title" defaultValue={ticket?.title} />

      <Label htmlFor="content">Content</Label>
      <Textarea id="content" name="content" defaultValue={ticket?.content} />
      <SubmitButton label={ticket ? "Edit" : "Create"} />
    </form>
  );
};

export default TicketUpsertForm;
