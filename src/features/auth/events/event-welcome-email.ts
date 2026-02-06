import { inngest } from "@/lib/inngest";
import prisma from "@/lib/prisma";
import { sendEmailWelcome } from "../emails/send-email-welcome";

export type WelcomeEmailEventArgs = {
  data: {
    userId: string;
  };
};

export const welcomeEmailEvent = inngest.createFunction(
  { id: "welcome-email" },
  { event: "app/auth.welcome-email" },
  async ({ event, step }) => {
    const { userId } = event.data;

    await step.sleep("welcome-email-delay", "5m");

    const user = await prisma.user.findUniqueOrThrow({
      where: { id: userId },
    });

    const result = await sendEmailWelcome(user.username, user.email);

    if (result.error)
      throw new Error(`${result.error.name}: ${result.error.message}`);

    return { event, body: result };
  },
);
