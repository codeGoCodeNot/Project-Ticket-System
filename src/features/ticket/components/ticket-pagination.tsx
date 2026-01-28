"use client";

import { useQueryStates } from "nuqs";
import { paginationOptions, paginationParser } from "../search-params";
import Pagination from "@/components/pagination";

const TicketPagination = () => {
  const [pagination, setPagination] = useQueryStates(
    paginationParser,
    paginationOptions,
  );

  return (
    <div>
      <Pagination pagination={pagination} onPagination={setPagination} />
    </div>
  );
};

export default TicketPagination;
