"use client";

import useConfirmDialog from "@/components/confirm-dialog";
import { Button } from "@/components/ui/button";
import { LucideTrash2 } from "lucide-react";
import deleteComment from "../actions/delete-comment";
import { toast } from "sonner";

type CommentDeleteButtonProps = {
  id: string;
};

const CommentDeleteButton = ({ id }: CommentDeleteButtonProps) => {
  const deleteWithToast = async () => {
    const promise = deleteComment(id);

    toast.promise(promise, {
      loading: "Deleting comment...",
    });

    const result = await promise;
    if (result.status === "ERROR") {
      toast.error(result.message);
    } else if (result.status === "SUCCESS") {
      toast.success(result.message);
    }
    return result;
  };

  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: deleteWithToast,
    trigger: (
      <Button variant="outline" size="icon">
        <LucideTrash2 />
      </Button>
    ),
  });

  return (
    <>
      {deleteDialog}
      {deleteButton}
    </>
  );
};

export default CommentDeleteButton;
