"use client";

import Form from "@/components/form/form";
import SubmitButton from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { useActionState } from "react";
import { acceptInvitation } from "../actions/accept-invitation";

type InvitationAcceptFormProps = {
  tokenId: string;
};

const EmailInvitationAcceptForm = ({ tokenId }: InvitationAcceptFormProps) => {
  const [actionState, action] = useActionState(
    acceptInvitation.bind(null, tokenId),
    EMPTY_ACTION_STATE,
  );

  return (
    <Form action={action} actionState={actionState}>
      <SubmitButton label="Accept Invitation" />
    </Form>
  );
};

export default EmailInvitationAcceptForm;
