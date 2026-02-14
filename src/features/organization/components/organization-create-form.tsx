"use client";

import FieldError from "@/components/form/field-error";
import Form from "@/components/form/form";
import SubmitButton from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useActionState } from "react";
import createOrganization from "../actions/create-organization";

const OrganizationCreateForm = () => {
  const [actionState, action] = useActionState(
    createOrganization,
    EMPTY_ACTION_STATE,
  );

  return (
    <Form actionState={actionState} action={action}>
      <Input
        name="name"
        placeholder="Organization Name"
        defaultValue={actionState.payload?.get("name") as string}
      />
      <FieldError actionState={actionState} name="name" />

      <Tooltip>
        <TooltipTrigger asChild>
          <span className="inline-flex">
            <SubmitButton label="Create Organization" />
          </span>
        </TooltipTrigger>
        <TooltipContent>Create organization</TooltipContent>
      </Tooltip>
    </Form>
  );
};

export default OrganizationCreateForm;
