import CardCompact from "@/components/card-compact";
import Heading from "@/components/heading";
import SkeletonComponents from "@/components/skeleton-components";
import TicketList from "@/features/ticket/components/ticket-list";
import TicketUpsertForm from "@/features/ticket/components/ticket-upsert-form";
import { searchParamsCache } from "@/features/ticket/search-params";
import { SearchParams } from "next/dist/server/request/search-params";
import { Suspense } from "react";

type TicketsByOrganizationPageProps = {
  searchParams: Promise<SearchParams>;
};

const TicketsByOrganizationPage = async ({
  searchParams,
}: TicketsByOrganizationPageProps) => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="Our Tickets" desc="Tickets from our organization" />

      <CardCompact
        title="Create Ticket"
        desc="A new ticket will be created"
        classname="w-full max-w-[420px] self-center"
        content={<TicketUpsertForm />}
      />

      <Suspense fallback={<SkeletonComponents length={3} />}>
        <TicketList
          byOrganization
          searchParams={await searchParamsCache.parse(searchParams)}
        />
      </Suspense>
    </div>
  );
};

export default TicketsByOrganizationPage;
