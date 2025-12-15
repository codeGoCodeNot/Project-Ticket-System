import Heading from "@/components/heading";
import { ticketsPath } from "@/path";
import Link from "next/link";

// This is a Home page
const HomePage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="Home" desc="Your home place to start" />

      <div className="flex-1 flex flex-col items-center">
        <Link href={ticketsPath()} className="underline">
          Go to tickets
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
