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
import { Button } from "@/components/ui/button";
import { useEffect, useState, useTransition } from "react";
import { useActionState } from "react";
import emailVerification from "../actions/email-verification";
import resendEmailVerification from "../actions/resend-email-verification";
import { REGEXP_ONLY_CHARS } from "input-otp";

const COOLDOWN_SECONDS = 60;

const EmailVerificationForm = () => {
  const [actionState, action] = useActionState(
    emailVerification,
    EMPTY_ACTION_STATE,
  );

  const [countdown, setCountdown] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [resendMessage, setResendMessage] = useState<{
    type: "success" | "error";
    message: string | string[];
  } | null>(null);

  // Handle countdown timer
  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  const handleResend = () => {
    startTransition(async () => {
      const result = await resendEmailVerification(EMPTY_ACTION_STATE);
      if (result.status === "SUCCESS") {
        setCountdown(COOLDOWN_SECONDS);
        setResendMessage({ type: "success", message: result.message || "" });
        setTimeout(() => setResendMessage(null), 3000);
      } else {
        setResendMessage({
          type: "error",
          message: result.message || "Failed to resend code",
        });
        setTimeout(() => setResendMessage(null), 3000);
      }
    });
  };

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

      <div className="mt-5 flex flex-col gap-y-2">
        <SubmitButton label="Verify Email" />
        <div className="text-center">
          <Button
            type="button"
            variant="outline"
            onClick={handleResend}
            disabled={countdown > 0 || isPending}
            className="w-full"
          >
            {countdown > 0
              ? `Resend Code (${countdown}s)`
              : isPending
                ? "Sending..."
                : "Resend Code"}
          </Button>
          {resendMessage && (
            <p
              className={`text-sm mt-2 ${
                resendMessage.type === "success"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {resendMessage.message}
            </p>
          )}
        </div>
      </div>
    </Form>
  );
};

export default EmailVerificationForm;
