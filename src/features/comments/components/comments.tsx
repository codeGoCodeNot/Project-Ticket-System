"use client";

import CardCompact from "@/components/card-compact";
import CommentItem from "@/components/comment-item";
import { fetcher } from "@/fetcher";
import { commentAPIPath } from "@/path";
import { useInView } from "react-intersection-observer";
import useSWR from "swr";
import { paginatedData } from "../../../../types/paginations";
import getComments from "../queries/get-comments";
import { CommentWithMetaData } from "../type";
import CommentDeleteButton from "./comment-delete-button";
import CommentUpdateButton from "./comment-update-button";
import CommentUpsertForm from "./comment-upsert-form";

import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

type CommentsProps = {
  ticketId: string;
  commentId?: string;
  paginatedComments: paginatedData<CommentWithMetaData>;
};

const Comments = ({
  ticketId,
  commentId,
  paginatedComments,
}: CommentsProps) => {
  const { data: comment } = useSWR(commentAPIPath(commentId ?? ""), fetcher);

  const queryKey = ["comments", ticketId];

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn: ({ pageParam }) => getComments(ticketId, pageParam),
      initialPageParam: undefined as
        | paginatedData<CommentWithMetaData>["metadata"]["cursor"]
        | undefined,
      getNextPageParam: (lastPage) =>
        lastPage.metadata.hasNextPage ? lastPage.metadata.cursor : undefined,
      initialData: {
        pages: [
          {
            list: paginatedComments.list,
            metadata: paginatedComments.metadata,
          },
        ],
        pageParams: [undefined],
      },
    });

  const comments = data.pages.flatMap((page) => page.list);

  const queryClient = useQueryClient();

  const handleDeleteComment = (id: string) => {
    queryClient.setQueryData<{
      pages: paginatedData<CommentWithMetaData>[];
      pageParams: string | undefined[];
    }>(queryKey, (oldData) => {
      if (!oldData || !oldData.pages) return oldData;

      const filteredPages = oldData.pages.map((page) => ({
        ...page,
        list: page.list.filter((comment) => comment.id !== id),
      }));

      const updatePages = { ...oldData, pages: filteredPages };

      return updatePages;
    });
  };

  const handleUpsertComment = (comment: CommentWithMetaData | undefined) => {
    queryClient.setQueryData<{
      pages: paginatedData<CommentWithMetaData>[];
      pageParams: string | undefined[];
    }>(queryKey, (oldData) => {
      if (!comment) return oldData;
      if (!oldData) return oldData;

      const upsertPages = {
        ...oldData,
        pages: [
          {
            ...oldData.pages[0],
            list: [comment, ...(oldData.pages[0]?.list ?? [])],
          },
          ...oldData.pages.slice(1),
        ],
      };
      return upsertPages;
    });
  };

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView, isFetchingNextPage]);

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
            onCreateComment={handleUpsertComment}
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
                      onDelete={handleDeleteComment}
                    />,
                  ]
                : []),
            ]}
          />
        ))}
      </div>

      <div ref={ref}>
        {!hasNextPage && (
          <p className="text-right text-sm italic">No more comments</p>
        )}
      </div>
    </>
  );
};

export default Comments;
