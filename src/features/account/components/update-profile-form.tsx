"use client";

import Form from "@/components/form/form";
import SubmitButton from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import updateProfile from "../action/update-profile";

type UserUpdateFormProps = {
  username: string;
  email: string;
};

const UpdateProfileForm = ({ email, username }: UserUpdateFormProps) => {
  const [actionState, action] = useActionState(
    updateProfile,
    EMPTY_ACTION_STATE,
  );

  return (
    <Form actionState={actionState} action={action}>
      <Label htmlFor="username">Username</Label>
      <Input
        name="username"
        id="username"
        type="text"
        defaultValue={
          (actionState.payload?.get("username") as string) ?? username
        }
      />

      <Label htmlFor="email">Email</Label>
      <Input
        name="email"
        id="email"
        type="text"
        defaultValue={(actionState.payload?.get("email") as string) ?? email}
      />

      <SubmitButton label="Update user" />
    </Form>
  );
};

export default UpdateProfileForm;
