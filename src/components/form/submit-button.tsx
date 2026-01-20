"use client";

import { LucideLoader } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

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
};

const SubmitButton = ({ label, variant, icon }: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      className="w-full"
      type="submit"
      disabled={pending}
      variant={variant}
    >
      {pending && <LucideLoader className="animate-spin" />}
      {icon}
      {label}
    </Button>
  );
};

export default SubmitButton;
