"use client";

import { useQueryState } from "nuqs";
import { searchParser } from "../search-params";
import SearchInput from "@/components/search-input";

type TicketSearchInputProps = {
  placeholder: string;
};

const TicketSearchInputProps = ({ placeholder }: TicketSearchInputProps) => {
  const [search, setSearch] = useQueryState("search", searchParser);

  return (
    <SearchInput
      placeholder={placeholder}
      onChange={setSearch}
      value={search}
    />
  );
};

export default TicketSearchInputProps;
