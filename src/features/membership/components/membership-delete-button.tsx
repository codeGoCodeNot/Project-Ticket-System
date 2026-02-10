"use client";

import useConfirmDialog from "@/components/confirm-dialog";
import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { LucideLogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import deleteMembership from "../actions/delete-membership";

type MembershipDeleteButtonProps = {
  userId: string;
  organizationId: string;
};

const MembershipDeleteButton = ({
  userId,
  organizationId,
}: MembershipDeleteButtonProps) => {
  const router = useRouter();

  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: deleteMembership.bind(null, { userId, organizationId }),
    trigger: (isPending) => (
      <Button variant="destructive" size="icon">
        {isPending ? <Spinner /> : <LucideLogOut />}
      </Button>
    ),
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <div>
      {deleteDialog}
      {deleteButton}
    </div>
  );
};

export default MembershipDeleteButton;
