import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type MembershipSkeletonProps = {
  length?: number;
};

const MembershipSkeleton = ({ length = 3 }: MembershipSkeletonProps) => {
  return (
    <>
      {/* Mobile view - vertical cards */}
      <section className="sm:hidden flex flex-col items-center space-y-4">
        {Array.from({ length }).map((_, idx) => (
          <div key={idx} className="w-full max-w-[420px] flex gap-x-1">
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="flex gap-x-2 items-center">
                  <Skeleton className="h-4 w-24" />
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center gap-x-2">
                <span className="text-sm text-muted-foreground">
                  Email verified:
                </span>
                <Skeleton className="h-4 w-4" />
              </CardContent>
              <CardFooter className="flex justify-between text-sm">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-12" />
              </CardFooter>
            </Card>
            <div className="flex flex-col gap-y-1">
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
            </div>
          </div>
        ))}
      </section>

      {/* Desktop/Table view */}
      <div className="hidden sm:block w-full overflow-x-auto">
        <div className="space-y-2">
          {Array.from({ length }).map((_, idx) => (
            <div key={idx} className="flex gap-4 p-4 border rounded-lg">
              <Skeleton className="h-4 w-24 hidden sm:block" />
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-32 hidden md:block" />
              <Skeleton className="h-4 w-20 hidden md:block" />
              <Skeleton className="h-4 w-16 hidden md:block" />
              <div className="flex gap-2 ml-auto">
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-8" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MembershipSkeleton;
