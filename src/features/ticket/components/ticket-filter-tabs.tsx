"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQueryState } from "nuqs";
import { filterParser } from "../search-params";

const TicketFilterTabs = () => {
  const [filter, setFilter] = useQueryState(
    "filter",
    filterParser.withDefault("all"),
  );

  return (
    <Tabs
      value={filter}
      onValueChange={(value) => setFilter(value as "all" | "active")}
    >
      <TabsList className="w-full max-w-[420px]">
        <TabsTrigger value="all" className="flex-1">
          All My Tickets
        </TabsTrigger>
        <TabsTrigger value="active" className="flex-1">
          Active Organization
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default TicketFilterTabs;
