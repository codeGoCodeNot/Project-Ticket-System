import { Separator } from "./ui/separator";

type HeadingProps = {
  title: string;
  desc?: string;
};

// this component is use for TicketsPage
const Heading = ({ title, desc }: HeadingProps) => {
  return (
    <>
      <div>
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </div>
      <Separator />
    </>
  );
};

export default Heading;
