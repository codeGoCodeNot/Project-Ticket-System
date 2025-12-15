import Heading from "@/components/heading";
import TicketList from "@/features/ticket/components/ticket-list";
import { Suspense } from "react";

// This is a tickets page
const TicketsPage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="Tickets" desc="All your tickets at one place" />
      <Suspense>
        <TicketList />
      </Suspense>
    </div>
  );
};

export default TicketsPage;
