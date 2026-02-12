"use client";

import { LucideLoader } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { ButtonProps } from "@react-email/components";

type SubmitButtonProps = {
  label?: string;
  variant?:
    | "default"
    | "destructive"
    | "ghost"
    | "link"
    | "outline"
    | "secondary";
  icon?: React.ReactElement;
  size?: "default" | "sm" | "lg" | "icon"; // Added size prop
};

const SubmitButton = ({
  label,
  variant,
  icon,
  size = "default",
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} variant={variant} size={size}>
      {pending && <LucideLoader className="animate-spin" />}
      {!pending && icon ? icon : null}
      {label}
    </Button>
  );
};

export default SubmitButton;
