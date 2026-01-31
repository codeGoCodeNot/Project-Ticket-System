"use client";

import CardCompact from "@/components/card-compact";
import CommentItem from "@/components/comment-item";
import { Button } from "@/components/ui/button";
import { fetcher } from "@/fetcher";
import { commentAPIPath } from "@/path";
import { useState } from "react";
import useSWR from "swr";
import getComments from "../queries/get-comments";
import { CommentWithMetaData } from "../type";
import CommentDeleteButton from "./comment-delete-button";
import CommentUpdateButton from "./comment-update-button";
import CommentUpsertForm from "./comment-upsert-form";

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

  const [comments, setComments] = useState(paginatedComments.list);
  const [metadata, setMetadata] = useState(paginatedComments.metadata);

  const handleMore = async () => {
    const morePaginatedComments = await getComments(ticketId, comments.length);
    const moreComments = morePaginatedComments.list;

    setComments([...comments, ...moreComments]);
    setMetadata(morePaginatedComments.metadata);
  };

  const handleCreateComment = (comment: CommentWithMetaData) => {
    setComments((prev) => [comment, ...prev]);
  };

  const handleDelete = (id: string) => {
    setComments((prev) => prev.filter((comment) => comment.id !== id));
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
            onCreateComment={handleCreateComment}
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
                      onDelete={handleDelete}
                    />,
                  ]
                : []),
            ]}
          />
        ))}
      </div>

      <div className="flex flex-col justify-center ml-8">
        {metadata.hasNextPage && (
          <Button variant="ghost" onClick={handleMore}>
            More
          </Button>
        )}
      </div>
    </>
  );
};

export default Comments;
