import { CommentWithMetaData } from "@/features/comments/type";
import { Card } from "./ui/card";

type CommentItemProps = {
  comment: CommentWithMetaData;
  buttons: React.ReactNode[];
};

const CommentItem = ({ comment, buttons }: CommentItemProps) => {
  return (
    <div className="flex gap-x-1">
      <Card className="p-4 flex-1 flex flex-col gap-y-1">
        <div className="flex justify-between">
          <p className="text-sm text-muted-foreground">
            {comment.user?.username ?? "Deleted User"}
          </p>
          <p className="text-sm text-muted-foreground">
            {comment.createdAt.toLocaleDateString()}
          </p>
        </div>
        <p className="whitespace-pre-line">{comment.content}</p>
      </Card>
      <div className="flex gap-y-1 flex-col">{buttons}</div>
    </div>
  );
};

export default CommentItem;
