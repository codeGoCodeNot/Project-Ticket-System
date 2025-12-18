import CardCompact from "@/components/card-compact";
import Heading from "@/components/heading";
import Spinner from "@/components/spinner";
import TicketCreateForm from "@/features/ticket/components/ticket-create-form";
import TicketList from "@/features/ticket/components/ticket-list";
import { Suspense } from "react";

// This is a tickets page
const TicketsPage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="Tickets" desc="All your tickets at one place" />

      <CardCompact
        title="Create Ticket"
        desc="A new ticket will be created"
        classname="w-full max-w-[420px] self-center"
        content={<TicketCreateForm />}
      />

      <Suspense fallback={<Spinner />}>
        <TicketList />
      </Suspense>
    </div>
  );
};

export default TicketsPage;
