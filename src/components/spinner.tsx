import { LucideLoaderCircle } from "lucide-react";

const Spinner = () => {
  return (
    <div className="flex-1 flex flex-col self-center justify-center items-center">
      <LucideLoaderCircle className="animate-spin h-16 w-16" />
    </div>
  );
};

export default Spinner;
