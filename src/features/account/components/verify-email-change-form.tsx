"use client";

import FieldError from "@/components/form/field-error";
import Form from "@/components/form/form";
import SubmitButton from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useActionState } from "react";
import verifyEmailChange from "../action/verify-email-change";
import { REGEXP_ONLY_CHARS } from "input-otp";

const VerifyEmailChangeForm = () => {
  const [actionState, action] = useActionState(
    verifyEmailChange,
    EMPTY_ACTION_STATE,
  );

  return (
    <Form actionState={actionState} action={action}>
      <InputOTP
        maxLength={8}
        pattern={REGEXP_ONLY_CHARS}
        defaultValue={actionState.payload?.get("code") as string}
        name="code"
      >
        <InputOTPGroup className="flex justify-center w-full gap-2">
          {[...Array(8)].map((_, index) => (
            <InputOTPSlot key={index} index={index} />
          ))}
        </InputOTPGroup>
      </InputOTP>

      <FieldError actionState={actionState} name="code" />

      <SubmitButton label="Verify New Email" />
    </Form>
  );
};

export default VerifyEmailChangeForm;
