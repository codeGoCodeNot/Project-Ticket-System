import { Button } from "@/components/ui/button";
import { commentEditPath } from "@/path";
import { LucidePencil } from "lucide-react";
import Link from "next/link";

const CommentUpdateButton = ({
  commentId,
  ticketId,
}: {
  commentId: string;
  ticketId: string;
}) => {
  return (
    <Button variant="outline" size="icon" asChild>
      <Link href={commentEditPath(ticketId, commentId)}>
        <LucidePencil className="h-4 w-4" />
      </Link>
    </Button>
  );
};

export default CommentUpdateButton;
