"use client";

import useConfirmDialog from "@/components/confirm-dialog";
import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LucideTrash } from "lucide-react";
import { useRouter } from "next/navigation";
import deleteOrganization from "../actions/delete-organization";

type OrganizationDeleteButtonProps = {
  organizationId: string;
};

const OrganizationDeleteButton = ({
  organizationId,
}: OrganizationDeleteButtonProps) => {
  const router = useRouter();

  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: deleteOrganization.bind(null, organizationId),
    trigger: (isPending) => (
      <Button variant="destructive" size="icon">
        {isPending ? <Spinner /> : <LucideTrash />}
      </Button>
    ),
    onSuccess: () => {
      router.refresh();
    },
  });
  return (
    <>
      {deleteDialog}
      <Tooltip>
        <TooltipTrigger asChild>{deleteButton}</TooltipTrigger>
        <TooltipContent>Delete organization</TooltipContent>
      </Tooltip>
    </>
  );
};

export default OrganizationDeleteButton;
