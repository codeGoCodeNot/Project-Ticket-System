"use client";

import FieldError from "@/components/form/field-error";
import Form from "@/components/form/form";
import SubmitButton from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";
import passwordReset from "../actions/password-reset";

type PasswordResetFormProps = { tokenId: string };

const PasswordResetForm = ({ tokenId }: PasswordResetFormProps) => {
  const [actionState, action] = useActionState(
    passwordReset.bind(null, tokenId),
    EMPTY_ACTION_STATE,
  );

  return (
    <Form actionState={actionState} action={action}>
      <Input
        name="password"
        type="password"
        placeholder="New Password"
        defaultValue={actionState.payload?.get("password") as string}
      />
      <FieldError actionState={actionState} name="password" />

      <Input
        name="confirmPassword"
        type="password"
        placeholder="Confirm New Password"
        defaultValue={actionState.payload?.get("confirmPassword") as string}
      />
      <FieldError actionState={actionState} name="confirmPassword" />

      <SubmitButton label="Reset Password" />
    </Form>
  );
};

export default PasswordResetForm;
