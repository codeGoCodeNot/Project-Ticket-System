"use client";

import { useQueryStates } from "nuqs";
import { paginationOptions, paginationParser } from "../search-params";
import Pagination from "@/components/pagination";

type TicketPaginationProps = {
  paginatedTicketMetadata: { count: number; hasNextPage: boolean };
};

const TicketPagination = ({
  paginatedTicketMetadata,
}: TicketPaginationProps) => {
  const [pagination, setPagination] = useQueryStates(
    paginationParser,
    paginationOptions,
  );

  return (
    <div>
      <Pagination
        pagination={pagination}
        onPagination={setPagination}
        paginatedMetadata={paginatedTicketMetadata}
      />
    </div>
  );
};

export default TicketPagination;
