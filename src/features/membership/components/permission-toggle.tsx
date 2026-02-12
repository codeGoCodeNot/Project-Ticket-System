"use client";

import Form from "@/components/form/form";
import SubmitButton from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { LucideBan, LucideCheck } from "lucide-react";
import { useActionState } from "react";
import togglePermission from "../actions/toggle-permission";

type PermissionToggleProps = {
  userId: string;
  organizationId: string;
  permissionKey: "canDeleteTickets"; // For now, we only have one permission, but this can be extended in the future
  permissionValue: boolean;
};

const PermissionToggle = ({
  userId,
  organizationId,
  permissionKey,
  permissionValue,
}: PermissionToggleProps) => {
  const [actionState, action] = useActionState(
    togglePermission.bind(null, {
      userId,
      organizationId,
      permissionKey,
    }),
    EMPTY_ACTION_STATE,
  );

  return (
    <Form action={action} actionState={actionState}>
      <SubmitButton
        icon={permissionValue ? <LucideCheck /> : <LucideBan />}
        size="icon"
        variant={permissionValue ? "secondary" : "outline"}
      />
    </Form>
  );
};

export default PermissionToggle;
