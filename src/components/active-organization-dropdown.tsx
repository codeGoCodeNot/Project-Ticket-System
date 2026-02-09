"use client";

import useActionFeedback from "@/components/form/hooks/use-action-feedback";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import switchOrganization from "@/features/organization/actions/switch-organization";
import { useActionState } from "react";
import { toast } from "sonner";
import Form from "./form/form";

type OrganizationOption = {
  id: string;
  name: string;
  membershipByUser: {
    isActive: boolean;
  };
};

type ActiveOrganizationDropdownProps = {
  organizations: OrganizationOption[];
  activeOrganizationId?: string;
  activeOrganizationName?: string;
};

type OrganizationSwitchMenuItemProps = {
  organization: OrganizationOption;
  isActive: boolean;
};

const OrganizationSwitchMenuItem = ({
  organization,
  isActive,
}: OrganizationSwitchMenuItemProps) => {
  const [actionState, action, isPending] = useActionState(
    switchOrganization.bind(null, organization.id),
    EMPTY_ACTION_STATE,
  );

  useActionFeedback(actionState, {
    onSuccess: ({ actionState: nextState }) => {
      if (nextState.message) toast.success(nextState.message);
    },
    onError: ({ actionState: nextState }) => {
      if (nextState.message) toast.error(nextState.message);
    },
  });

  return (
    <DropdownMenuItem asChild>
      <Form action={action} actionState={actionState}>
        <button
          type="submit"
          disabled={isPending}
          className="flex w-full items-center justify-between gap-2"
        >
          <span className="text-sm text-muted-foreground truncate my-1">
            {organization.name}
          </span>

          {isActive ? (
            <span className="text-[10px] text-muted-foreground">Active</span>
          ) : null}
        </button>
      </Form>
    </DropdownMenuItem>
  );
};

const ActiveOrganizationDropdown = ({
  organizations,
  activeOrganizationId,
  activeOrganizationName,
}: ActiveOrganizationDropdownProps) => {
  const hasOrganizations = organizations.length > 0;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          className="h-7 max-w-[200px] justify-start px-2 text-xs"
        >
          <span className="truncate">
            {activeOrganizationName ??
              (hasOrganizations ? "Choose organization" : "No organizations")}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Organizations</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {!hasOrganizations ? (
          <DropdownMenuItem disabled>No organizations yet</DropdownMenuItem>
        ) : (
          organizations.map((organization) => (
            <OrganizationSwitchMenuItem
              key={organization.id}
              organization={organization}
              isActive={organization.id === activeOrganizationId}
            />
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActiveOrganizationDropdown;
