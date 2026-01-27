import CardCompact from "@/components/card-compact";
import Heading from "@/components/heading";
import SkeletonComponents from "@/components/skeleton-components";
import getAuth from "@/features/auth/queries/get-auth";
import TicketList from "@/features/ticket/components/ticket-list";
import TicketUpsertForm from "@/features/ticket/components/ticket-upsert-form";
import { SearchParams } from "@/features/ticket/type";
import { Suspense } from "react";

type TicketsPageProps = {
  searchParams: Promise<SearchParams>;
};

const TicketsPage = async ({ searchParams }: TicketsPageProps) => {
  const { user } = await getAuth();

  return (
    <>
      <div className="flex-1 flex flex-col gap-y-8">
        <Heading title="My Tickets" desc="All your tickets at one place" />

        <CardCompact
          title="Create Ticket"
          desc="A new ticket will be created"
          classname="w-full max-w-[420px] self-center"
          content={<TicketUpsertForm />}
        />

        <Suspense fallback={<SkeletonComponents length={5} />}>
          <TicketList userId={user?.id} searchParams={await searchParams} />
        </Suspense>
      </div>
    </>
  );
};

export default TicketsPage;
