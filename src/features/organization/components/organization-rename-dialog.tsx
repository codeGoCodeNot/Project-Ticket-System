"use client";

import Form from "@/components/form/form";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LucidePen } from "lucide-react";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import updateOrganization from "../actions/update-organization";

type OrganizationRenameDialogProps = {
  organizationId: string;
  currentName: string;
};

const OrganizationRenameDialog = ({
  organizationId,
  currentName,
}: OrganizationRenameDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(currentName);
  const toastRef = useRef<string | number | null>(null);

  const handleAction = async (_: unknown, formData: FormData) => {
    const newName = formData.get("organization-name") as string;

    if (!newName.trim()) {
      toast.error("Organization name must not be empty");
      return EMPTY_ACTION_STATE;
    }
    if (newName === currentName) {
      setIsOpen(false);
      return EMPTY_ACTION_STATE;
    }

    return updateOrganization(organizationId, newName.trim());
  };

  const [actionState, formAction, isPending] = useActionState(
    handleAction,
    EMPTY_ACTION_STATE,
  );

  useEffect(() => {
    if (isPending) {
      toastRef.current = toast.loading("Renaming organization...");
    } else if (toastRef.current) {
      toast.dismiss(toastRef.current);
    }

    return () => {
      if (toastRef.current) {
        toast.dismiss(toastRef.current);
      }
    };
  }, [isPending]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isPending && inputValue.trim()) {
      const formData = new FormData();
      formData.set("organization-name", inputValue);
      formAction(formData);
    }
  };

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsOpen(true)}
        title="Rename organization"
      >
        <LucidePen />
      </Button>

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Rename Organization</AlertDialogTitle>
            <AlertDialogDescription>
              Enter a new name for your organization. This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Form
            action={formAction}
            actionState={actionState}
            onSuccess={() => {
              setIsOpen(false);
              setInputValue(currentName);
            }}
          >
            <Input
              name="organization-name"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Organization name"
              disabled={isPending}
              onKeyDown={handleKeyDown}
              autoFocus
            />
            <div className="flex justify-end gap-2 mt-4">
              <AlertDialogCancel disabled={isPending} type="button">
                Cancel
              </AlertDialogCancel>
              <Button
                type="submit"
                disabled={
                  isPending || !inputValue.trim() || inputValue === currentName
                }
              >
                {isPending ? "Renaming..." : "Rename"}
              </Button>
            </div>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default OrganizationRenameDialog;
