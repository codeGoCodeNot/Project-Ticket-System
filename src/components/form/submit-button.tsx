"use client";

import { LucideLoaderCircle } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

interface SubmitButtonProps {
  label?: string;
  icon?: React.ReactElement;
}

const SubmitButton = ({ label, icon }: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit">
      {pending && <LucideLoaderCircle className="animate-spin" />}
      {label}
      {pending ? null : icon}
    </Button>
  );
};

export default SubmitButton;
