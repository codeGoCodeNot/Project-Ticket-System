import Heading from "@/components/heading";
import Spinner from "@/components/spinner";
import TicketList from "@/features/ticket/components/ticket-list";
import { Suspense } from "react";

// This is a Home page
const HomePage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="All tickets" desc="Tickets by everyone at one place" />

      <Suspense fallback={<Spinner />}>
        <TicketList />
      </Suspense>
    </div>
  );
};

export default HomePage;
