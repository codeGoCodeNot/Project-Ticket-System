"use client";

import useConfirmDialog from "@/components/confirm-dialog";
import { Button } from "@/components/ui/button";
import { LucideTrash2 } from "lucide-react";
import deleteComment from "../actions/delete-comment";

type CommentDeleteButtonProps = {
  id: string;
  onDelete?: (id: string) => void;
};

const CommentDeleteButton = ({ id, onDelete }: CommentDeleteButtonProps) => {
  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: deleteComment.bind(null, id),
    trigger: (
      <Button variant="outline" size="icon">
        <LucideTrash2 />
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
