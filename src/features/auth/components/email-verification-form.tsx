"use client";

import FieldError from "@/components/form/field-error";
import Form from "@/components/form/form";
import SubmitButton from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";
import emailVerification from "../actions/email-verification";

const EmailVerificationForm = () => {
  const [actionState, action] = useActionState(
    emailVerification,
    EMPTY_ACTION_STATE,
  );

  return (
    <Form actionState={actionState} action={action}>
      <Input
        name="code"
        placeholder="Verification Code"
        defaultValue={actionState.payload?.get("code") as string}
      />
      <FieldError actionState={actionState} name="code" />

      <SubmitButton label="Verify Email" />
    </Form>
  );
};

export default EmailVerificationForm;
