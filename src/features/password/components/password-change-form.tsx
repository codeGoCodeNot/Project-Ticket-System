"use client";

import FieldError from "@/components/form/field-error";
import Form from "@/components/form/form";
import SubmitButton from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { useActionState, useState } from "react";
import passwordChange from "../actions/password-change";
import PasswordStrengthMeter from "@/components/password-strength-meter";

const PasswordChangeForm = () => {
  const [actionState, action] = useActionState(
    passwordChange,
    EMPTY_ACTION_STATE,
  );

  const [password, setPassword] = useState("");

  return (
    <Form actionState={actionState} action={action}>
      <Input
        type="password"
        name="currentPassword"
        placeholder="Current Password"
        defaultValue={actionState.payload?.get("currentPassword") as string}
      />
      <FieldError actionState={actionState} name="currentPassword" />

      <Input
        type="password"
        name="newPassword"
        placeholder="New Password"
        defaultValue={actionState.payload?.get("newPassword") as string}
        onChange={(e) => setPassword(e.target.value)}
      />
      <PasswordStrengthMeter password={password} />
      <FieldError actionState={actionState} name="newPassword" />

      <Input
        type="password"
        name="confirmNewPassword"
        placeholder="Confirm New Password"
        defaultValue={actionState.payload?.get("confirmNewPassword") as string}
      />
      <FieldError actionState={actionState} name="confirmNewPassword" />

      <SubmitButton label="Change Password" />
    </Form>
  );
};

export default PasswordChangeForm;
