import { LucideLoader } from "lucide-react";
import React from "react";

const Spinner = () => {
  return (
    <div
      role="status"
      className="flex-1 flex flex-col items-center justify-center self-center"
    >
      <LucideLoader className="animate-spin h-20 w-20" />
    </div>
  );
};

export default Spinner;
