import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

const CommentSkeleton = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center flex-1 gap-x-2">
            <div className="flex flex-col gap-y-2">
              <Skeleton className="h-8 w-20 " />
              <Skeleton className="h-8 w-35 " />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-2 items-center">
          <Skeleton className="h-[60px] w-full " />
          <Skeleton className="h-[35px] w-full " />
        </CardContent>
      </Card>
    </div>
  );
};

export default CommentSkeleton;
