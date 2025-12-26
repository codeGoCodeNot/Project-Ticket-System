"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LucideLoaderCircle } from "lucide-react";
import signUp from "./actions/sign-up";
import { useActionState } from "react";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import Form from "@/components/form/form";
import FieldError from "@/components/form/field-error";

const SignUpForm = () => {
  const [actionState, action, isPending] = useActionState(
    signUp,
    EMPTY_ACTION_STATE
  );

  return (
    <Form action={action} actionState={actionState}>
      <Label htmlFor="username">Username</Label>
      <Input name="username" placeholder="Username" />
      <FieldError actionState={actionState} name="username" />

      <Label htmlFor="email">Email</Label>
      <Input name="email" placeholder="Email" />
      <FieldError actionState={actionState} name="email" />

      <Label htmlFor="password">Password</Label>
      <Input name="password" placeholder="Password" type="password" />
      <FieldError actionState={actionState} name="password" />

      <Label htmlFor="confirmPassword">Confirm password</Label>
      <Input name="confirmPassword" placeholder="Password" type="password" />
      <FieldError actionState={actionState} name="confirmPassword" />

      <Button type="submit">
        {isPending && <LucideLoaderCircle className="h-4 w-4 animate-spin" />}
        SignUp
      </Button>
    </Form>
  );
};

export default SignUpForm;
