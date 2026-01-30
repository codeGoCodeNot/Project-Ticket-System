import CommentItem from "@/components/comment-item";
import getComments from "../queries/get-comments";
import CardCompact from "@/components/card-compact";
import CommentUpsertForm from "./comment-upsert-form";
import CommentDeleteButton from "./comment-delete-button";
import getAuth from "@/features/auth/queries/get-auth";
import isOwner from "@/features/auth/utils/is-owner";
import CommentUpdateButton from "./comment-update-button";
import getComment from "../queries/get-comment";

type CommentsProps = {
  ticketId: string;
  commentId?: string;
};

const Comments = async ({ ticketId, commentId }: CommentsProps) => {
  const comments = await getComments(ticketId);
  const comment = await getComment(commentId ?? "");
  const { user } = await getAuth();

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
              ...(isOwner(user, comment)
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
