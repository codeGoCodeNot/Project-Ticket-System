import CardCompact from "@/components/card-compact";
import Heading from "@/components/heading";
import Spinner from "@/components/spinner";
import TicketList from "@/features/ticket/components/ticket-list";
import TicketCreateForm from "@/features/ticket/components/ticketCreateForm";
import { Suspense } from "react";

// This is a tickets page
const TicketsPage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="Tickets" desc="All your tickets at one place" />

      <CardCompact
        title="Create Ticket"
        desc="A new ticket will be created"
        classname="flex flex-col gap-y-2"
        content={<TicketCreateForm />}
      />

      <Suspense fallback={<Spinner />}>
        <TicketList />
      </Suspense>
    </div>
  );
};

export default TicketsPage;
