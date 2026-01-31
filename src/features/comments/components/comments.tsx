"use client";

import CardCompact from "@/components/card-compact";
import CommentItem from "@/components/comment-item";
import { fetcher } from "@/fetcher";
import { commentAPIPath } from "@/path";
import useSWR from "swr";
import { CommentWithMetaData } from "../type";
import CommentDeleteButton from "./comment-delete-button";
import CommentUpdateButton from "./comment-update-button";
import CommentUpsertForm from "./comment-upsert-form";
import { Button } from "@/components/ui/button";
import getComments from "../queries/get-comments";

type CommentsProps = {
  ticketId: string;
  commentId?: string;
  paginatedComments: {
    list: CommentWithMetaData[];
    metadata: { count: number; hasNextPage: boolean };
  };
};

const Comments = ({
  ticketId,
  commentId,
  paginatedComments,
}: CommentsProps) => {
  const { data: comment } = useSWR(commentAPIPath(commentId ?? ""), fetcher);

  const comments = paginatedComments.list;

  const handleMore = async () => {
    const morePaginatedComments = await getComments(ticketId);
    const moreComments = morePaginatedComments.list;

    console.log(moreComments);
  };

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

      <div className="flex flex-col justify-center ml-8">
        <Button variant="ghost" onClick={handleMore}>
          More
        </Button>
      </div>
    </>
  );
};

export default Comments;
