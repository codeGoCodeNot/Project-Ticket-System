import { EmailVerificationEventArgs } from "@/features/auth/events/event-email-verification";
import { WelcomeEmailEventArgs } from "@/features/auth/events/event-welcome-email";
import { PasswordResetEventArgs } from "@/features/password/events/event-password-reset";
import { EmailChangeEventArgs } from "@/features/account/events/event-email-change";
import { EventSchemas, Inngest } from "inngest";
import { InvitationCreateEventArgs } from "@/features/invitation/events/event-invitation-create";

// No extra args needed for processInvitationsOnSignUp, uses app/auth.sign-up

type Events = {
  "app/password.password-reset": PasswordResetEventArgs;
  "app/auth.welcome-email": WelcomeEmailEventArgs;
  "app/auth.sign-up": EmailVerificationEventArgs; // also used for invitation processing
  "app/account.email-change": EmailChangeEventArgs;
  "app/invitation.created": InvitationCreateEventArgs;
};

export const inngest = new Inngest({
  id: "tickethub",
  schemas: new EventSchemas().fromRecord<Events>(),
});
