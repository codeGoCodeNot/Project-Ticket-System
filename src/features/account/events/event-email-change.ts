import { inngest } from "@/lib/inngest";
import prisma from "@/lib/prisma";
import generateEmailVerificationCode from "@/features/auth/utils/generate-email-verification-code";
import { sendEmailChange } from "../emails/send-email-change";

export type EmailChangeEventArgs = {
  data: {
    userId: string;
    newEmail: string;
  };
};

export const emailChangeEvent = inngest.createFunction(
  { id: "email-change" },
  { event: "app/account.email-change" },
  async ({ event, step }) => {
    const { userId, newEmail } = event.data;

    const user = await step.run("fetch-user", async () => {
      return await prisma.user.findUniqueOrThrow({
        where: {
          id: userId,
        },
      });
    });

    const verificationCode = await step.run(
      "generate-email-change-code",
      async () => {
        return await generateEmailVerificationCode(user.id, newEmail);
      },
    );

    const result = await step.run(
      "send-email-change-notification",
      async () => {
        return await sendEmailChange(user.username, newEmail, verificationCode);
      },
    );

    if (result.error) {
      throw new Error(
        "Failed to send email change notification: " + result.error,
      );
    }

    return { event, body: result };
  },
);
