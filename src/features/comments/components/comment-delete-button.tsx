"use client";

import useConfirmDialog from "@/components/confirm-dialog";
import { Button } from "@/components/ui/button";
import { LucideCircle, LucideTrash2 } from "lucide-react";
import deleteComment from "../actions/delete-comment";

type CommentDeleteButtonProps = {
  id: string;
  onDelete?: (id: string) => void;
};

const CommentDeleteButton = ({ id, onDelete }: CommentDeleteButtonProps) => {
  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: deleteComment.bind(null, id),
    trigger: (isPending) => (
      <Button variant="outline" size="icon">
        {isPending ? (
          <LucideCircle className="animate-spin" />
        ) : (
          <LucideTrash2 />
        )}
      </Button>
    ),
    onSuccess: () => onDelete?.(id),
  });

  return (
    <>
      {deleteDialog}
      {deleteButton}
    </>
  );
};

export default CommentDeleteButton;
