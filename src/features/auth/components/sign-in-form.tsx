"use client";

import FieldError from "@/components/form/field-error";
import Form from "@/components/form/form";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LucideLoaderCircle } from "lucide-react";
import { useActionState } from "react";
import signIn from "../actions/sign-in";

const SignInForm = () => {
  const [actionState, action, isPending] = useActionState(
    signIn,
    EMPTY_ACTION_STATE
  );

  return (
    <Form actionState={actionState} action={action}>
      <Label htmlFor="email">Email</Label>
      <Input name="email" placeholder="Email" />
      <FieldError actionState={actionState} name="email" />

      <Label htmlFor="password">Password</Label>
      <Input name="password" placeholder="Password" type="password" />
      <FieldError actionState={actionState} name="password" />

      <Button type="submit" className="w-full">
        {isPending && <LucideLoaderCircle className="h-4 w-4 animate-spin" />}
        Sign In
      </Button>
    </Form>
  );
};

export default SignInForm;
