import { EmailVerificationEventArgs } from "@/features/auth/events/event-email-verification";
import { WelcomeEmailEventArgs } from "@/features/auth/events/event-welcome-email";
import { PasswordResetEventArgs } from "@/features/password/events/event-password-reset";
import { EventSchemas, Inngest } from "inngest";

type Events = {
  "app/password.password-reset": PasswordResetEventArgs;
  "app/auth.welcome-email": WelcomeEmailEventArgs;
  "app/auth.sign-up": EmailVerificationEventArgs;
};

export const inngest = new Inngest({
  id: "tickethub",
  schemas: new EventSchemas().fromRecord<Events>(),
});
