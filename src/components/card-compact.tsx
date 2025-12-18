import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

type CardCompactProps = {
  title: string;
  desc: string;
  content: React.ReactElement;
  footer?: React.ReactElement;
  classname?: string;
};

const CardCompact = ({
  title,
  desc,
  content,
  footer,
  classname,
}: CardCompactProps) => {
  return (
    <Card className="w-full max-w-[420px] self-center">
      <CardHeader className={classname}>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>
      <CardContent>{content}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
};

export default CardCompact;
