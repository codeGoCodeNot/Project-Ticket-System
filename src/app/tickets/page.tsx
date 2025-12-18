import Heading from "@/components/heading";
import Spinner from "@/components/spinner";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import TicketList from "@/features/ticket/components/ticket-list";
import TicketCreateForm from "@/features/ticket/components/ticketCreateForm";
import { Suspense } from "react";

// This is a tickets page
const TicketsPage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="Tickets" desc="All your tickets at one place" />

      <Card className="w-full max-w-[420px] self-center">
        <CardHeader className="flex flex-col gap-y-2">
          <CardTitle>Create Ticket</CardTitle>
          <CardDescription>A new ticket will be created</CardDescription>
        </CardHeader>
        <CardContent>
          <TicketCreateForm />
        </CardContent>
      </Card>

      <Suspense fallback={<Spinner />}>
        <TicketList />
      </Suspense>
    </div>
  );
};

export default TicketsPage;
