"use client";

import { Textarea } from "@/components/ui/textarea";
import upsertComment from "../actions/upsert-comment";
import SubmitButton from "@/components/form/submit-button";
import { useActionState } from "react";
import {
  ActionState,
  EMPTY_ACTION_STATE,
} from "@/components/form/utils/to-action-state";
import Form from "@/components/form/form";
import FieldError from "@/components/form/field-error";
import { CommentWithMetaData } from "../type";
import { on } from "events";

type CommentUpsertFormProps = {
  ticketId: string;
  commentId: string;
  content?: string;
  onCreateComment?: (comment: CommentWithMetaData) => void;
};

const CommentUpsertForm = ({
  ticketId,
  commentId,
  content,
  onCreateComment,
}: CommentUpsertFormProps) => {
  const [actionState, action] = useActionState(
    upsertComment.bind(null, ticketId, commentId),
    EMPTY_ACTION_STATE,
  );

  const handleSuccess = (actionState: ActionState) => {
    onCreateComment?.(actionState.data as CommentWithMetaData);
  };

  return (
    <Form action={action} actionState={actionState} onSuccess={handleSuccess}>
      <Textarea
        name="content"
        placeholder="What's on your mind..."
        defaultValue={
          (actionState.payload?.get("content") as string) ?? content
        }
      />
      <FieldError name="content" actionState={actionState} />

      <SubmitButton label={commentId ? "Update Comment" : "Create Comment"} />
    </Form>
  );
};

export default CommentUpsertForm;
