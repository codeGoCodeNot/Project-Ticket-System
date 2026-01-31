import CardCompact from "@/components/card-compact";
import CommentItem from "@/components/comment-item";
import useSWR from "swr";
import { CommentWithMetaData } from "../type";
import CommentDeleteButton from "./comment-delete-button";
import CommentUpdateButton from "./comment-update-button";
import CommentUpsertForm from "./comment-upsert-form";
import { commentIdPath } from "@/path";
import { fetcher } from "@/fetcher";

type CommentsProps = {
  ticketId: string;
  commentId?: string;
  comments: CommentWithMetaData[];
};

const Comments = ({ ticketId, commentId, comments }: CommentsProps) => {
  const { data: comment } = useSWR(
    commentId ? commentIdPath(commentId) : null,
    fetcher,
  );

  return (
    <>
      <CardCompact
        title="Create Comment"
        desc="A new comment will be created"
        content={
          <CommentUpsertForm
            ticketId={ticketId}
            commentId={commentId ?? ""}
            content={comment?.content}
          />
        }
      />
      <div className="flex flex-col gap-y-2 ml-8">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            buttons={[
              ...(comment.isOwner
                ? [
                    <CommentUpdateButton
                      key={comment.id + "-edit"}
                      commentId={comment.id}
                      ticketId={ticketId}
                    />,
                    <CommentDeleteButton
                      key={comment.id + "-delete"}
                      id={comment.id}
                    />,
                  ]
                : []),
            ]}
          />
        ))}
      </div>
    </>
  );
};

export default Comments;
