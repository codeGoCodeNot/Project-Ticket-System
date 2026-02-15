import { emailVerificationEvent } from "@/features/auth/events/event-email-verification";
import { welcomeEmailEvent } from "@/features/auth/events/event-welcome-email";
import { passwordResetEvent } from "@/features/password/events/event-password-reset";
import { emailChangeEvent } from "@/features/account/events/event-email-change";
import { inngest } from "@/lib/inngest";
import { serve } from "inngest/next";
import { invitationCreateEvent } from "@/features/invitation/events/event-invitation-create";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    passwordResetEvent,
    welcomeEmailEvent,
    emailVerificationEvent,
    emailChangeEvent,
    invitationCreateEvent,
  ],
});
