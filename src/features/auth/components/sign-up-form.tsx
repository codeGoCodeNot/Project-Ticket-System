"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LucideLoaderCircle } from "lucide-react";
import signUp from "../actions/sign-up";
import { useActionState } from "react";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import Form from "@/components/form/form";
import FieldError from "@/components/form/field-error";
import SubmitButton from "@/components/form/submit-button";

const SignUpForm = () => {
  const [actionState, action, isPending] = useActionState(
    signUp,
    EMPTY_ACTION_STATE,
  );

  return (
    <Form action={action} actionState={actionState}>
      <Label htmlFor="username">Username</Label>
      <Input
        name="username"
        placeholder="Username"
        defaultValue={actionState.payload?.get("username") as string}
      />
      <FieldError actionState={actionState} name="username" />

      <Label htmlFor="email">Email</Label>
      <Input
        name="email"
        placeholder="Email"
        defaultValue={actionState.payload?.get("email") as string}
      />
      <FieldError actionState={actionState} name="email" />

      <Label htmlFor="password">Password</Label>
      <Input
        name="password"
        placeholder="Password"
        type="password"
        defaultValue={actionState.payload?.get("password") as string}
      />
      <FieldError actionState={actionState} name="password" />

      <Label htmlFor="confirmPassword">Confirm password</Label>
      <Input
        name="confirmPassword"
        placeholder="Password"
        type="password"
        defaultValue={actionState.payload?.get("confirmPassword") as string}
      />
      <FieldError actionState={actionState} name="confirmPassword" />
      <SubmitButton label="Sign Up" />
    </Form>
  );
};

export default SignUpForm;
