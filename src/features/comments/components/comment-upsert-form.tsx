"use client";

import { Textarea } from "@/components/ui/textarea";
import upsertComment from "../actions/upsert-comment";
import SubmitButton from "@/components/form/submit-button";
import { useActionState } from "react";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import Form from "@/components/form/form";
import FieldError from "@/components/form/field-error";

type CommentUpsertFormProps = {
  ticketId: string;
  commentId: string;
  content?: string;
};

const CommentUpsertForm = ({
  ticketId,
  commentId,
  content,
}: CommentUpsertFormProps) => {
  const [actionState, action] = useActionState(
    upsertComment.bind(null, ticketId, commentId),
    EMPTY_ACTION_STATE,
  );

  return (
    <Form action={action} actionState={actionState}>
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
