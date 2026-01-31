"use client";

import FieldError from "@/components/form/field-error";
import Form from "@/components/form/form";
import SubmitButton from "@/components/form/submit-button";
import {
  ActionState,
  EMPTY_ACTION_STATE,
} from "@/components/form/utils/to-action-state";
import { Textarea } from "@/components/ui/textarea";
import { useActionState } from "react";
import upsertComment from "../actions/upsert-comment";
import { CommentWithMetaData } from "../type";

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
