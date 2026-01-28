"use client";

import SortSelect, { SortSelectOption } from "@/components/sort-select";
import { useQueryStates } from "nuqs";
import { sortParser, paginationOptions } from "../search-params";

type TicketSortSelectProps = { options: SortSelectOption[] };

const TicketSortSelect = ({ options }: TicketSortSelectProps) => {
  const [sort, setSort] = useQueryStates(sortParser, paginationOptions);

  return <SortSelect options={options} value={sort} onChange={setSort} />;
};

export default TicketSortSelect;
