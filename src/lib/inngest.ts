import { PasswordResetEventArgs } from "@/features/password/events/event-password-reset";
import { EventSchemas, Inngest } from "inngest";

type Events = {
  "app/password.password-reset": PasswordResetEventArgs;
};

export const inngest = new Inngest({
  id: "tickethub",
  schemas: new EventSchemas().fromRecord<Events>(),
});
