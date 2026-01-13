"use client";

import { LucideLoader } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

interface SubmitButtonProps {
  label?: string;
  icon?: React.ReactElement;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}

const SubmitButton = ({
  label,
  icon,
  variant = "outline",
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit" variant={variant}>
      {pending && <LucideLoader className="animate-spin" />}
      {label}
      {pending ? null : icon}
    </Button>
  );
};

export default SubmitButton;
