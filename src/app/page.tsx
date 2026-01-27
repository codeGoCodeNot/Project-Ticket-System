import Heading from "@/components/heading";
import SkeletonComponents from "@/components/skeleton-components";
import TicketList from "@/features/ticket/components/ticket-list";
import { searchParamsCache } from "@/features/ticket/search-params";
import { SearchParams } from "nuqs/server";
import { Suspense } from "react";

type HomePageProps = {
  searchParams: Promise<SearchParams>;
};

const HomePage = async ({ searchParams }: HomePageProps) => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="All tickets" desc="Tickets by everyone at one place" />

      <Suspense fallback={<SkeletonComponents length={5} />}>
        <TicketList
          searchParams={await searchParamsCache.parse(searchParams)}
        />
      </Suspense>
    </div>
  );
};

export default HomePage;
