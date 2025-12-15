import { MessageSquareWarning } from "lucide-react";
import { cloneElement } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { ticketsPath } from "@/path";

type PlaceholderProps = {
  label: string;
  icon?: React.ReactElement<{ className?: string }>;
  button?: React.ReactNode;
};

// this component use by ticket page
const Placeholder = ({
  label,
  icon = <MessageSquareWarning />,
  button = (
    <Button asChild>
      <Link href={ticketsPath()}>Go back to tickets</Link>
    </Button>
  ),
}: PlaceholderProps) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center self-center gap-y-3">
      {cloneElement(icon, {
        className: "w-16 h-16",
      })}
      <h2 className="text-lg text-center">{label}</h2>
      {button}
    </div>
  );
};

export default Placeholder;
