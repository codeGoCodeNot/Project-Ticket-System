import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { Ticket } from "../../../../generated/prisma/client";
import updateTicket from "@/features/actions/update-ticket";

type TicketUpdateFormProps = {
  ticket: Ticket;
};

const TicketUpdateForm = ({ ticket }: TicketUpdateFormProps) => {
  return (
    <form
      action={updateTicket}
      className="
    flex flex-col gap-y-2
    "
    >
      <Input type="hidden" name="id" defaultValue={ticket.id} />
      <Label htmlFor="title">Title</Label>
      <Input type="text" id="title" name="title" defaultValue={ticket.title} />

      <Label htmlFor="content">Content</Label>
      <Textarea id="content" name="content" defaultValue={ticket.content} />

      <Button type="submit">Update</Button>
    </form>
  );
};

export default TicketUpdateForm;
