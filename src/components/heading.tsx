import { Separator } from "./ui/separator";

type HeadingProps = {
  title: string;
  desc?: string;
  tabs?: React.ReactNode;
  actions?: React.ReactNode;
};

// this component is use for TicketsPage
const Heading = ({ title, desc, tabs, actions }: HeadingProps) => {
  return (
    <>
      {tabs}
      <div className="flex flex-col gap-4 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
          <p className="text-sm text-muted-foreground">{desc}</p>
        </div>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:justify-end [&>*]:w-full sm:[&>*]:w-auto">
          {actions}
        </div>
      </div>
      <Separator />
    </>
  );
};

export default Heading;
