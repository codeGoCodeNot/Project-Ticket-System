"use client";

import useConfirmDialog from "@/components/confirm-dialog";
import { Button } from "@/components/ui/button";
import { LucideLoader2, LucideTrash } from "lucide-react";
import { useRouter } from "next/navigation";
import deleteInvitation from "../actions/delete-invitation";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type InvitationDeleteButtonProps = {
  email: string;
  organizationId: string;
};

const InvitationDeleteButton = ({
  email,
  organizationId,
}: InvitationDeleteButtonProps) => {
  const router = useRouter();

  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: deleteInvitation.bind(null, { email, organizationId }),
    trigger: (isLoading) => (
      <Button variant="destructive" size="icon">
        {isLoading ? (
          <LucideLoader2 className="animate-spin" />
        ) : (
          <LucideTrash />
        )}
      </Button>
    ),
    onSuccess: () => router.refresh(),
  });

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>{deleteButton}</TooltipTrigger>
        <TooltipContent>Delete invitation</TooltipContent>
      </Tooltip>
      {deleteDialog}
    </>
  );
};

export default InvitationDeleteButton;
