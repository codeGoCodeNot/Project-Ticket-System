import clsx from "clsx";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Skeleton } from "./ui/skeleton";

type SkeletonComponentsProps = { length: number; isDetail?: boolean };

const SkeletonComponents = ({ length, isDetail }: SkeletonComponentsProps) => {
  return (
    <div className="flex flex-col justify-center gap-y-4 items-center">
      {Array.from({ length }).map((_, idx) => (
        <div
          key={idx}
          className={clsx("flex w-full gap-x-1", {
            "max-w-[420px]": !isDetail,
            "max-w-[580px]": isDetail,
          })}
        >
          <Card className="w-full ">
            <CardHeader>
              <CardTitle className="flex items-center flex-1 gap-x-2">
                <div className="flex items-center gap-x-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="w-9/12 h-4" />
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div className="flex flex-col gap-y-2">
                <Skeleton className="w-20 h-4" />
                <Skeleton className="w-20 h-4" />
              </div>
              <Skeleton className="w-8 h-4" />
            </CardFooter>
          </Card>
          <div className="flex flex-col gap-y-1 mb-1">
            <Skeleton className="w-8 h-8" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonComponents;
