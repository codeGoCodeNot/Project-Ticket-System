import { inngest } from "@/lib/inngest";
import prisma from "@/lib/prisma";
import { sendEmailVerification } from "../emails/sent-email-verification";
import generateEmailVerificationCode from "../utils/generate-email-verification-code";

export type EmailVerificationEventArgs = {
  data: {
    userId: string;
  };
};

export const emailVerificationEvent = inngest.createFunction(
  { id: "email-verification" },
  { event: "app/auth.sign-up" },
  async ({ event, step }) => {
    const { userId } = event.data;

    await step.sleep("email-verification-delay", "2s");

    const user = await step.run("fetch-user", async () => {
      return await prisma.user.findUniqueOrThrow({
        where: {
          id: userId,
        },
      });
    });

    const verificationCode = await step.run("generate-verification-code", async () => {
      return await generateEmailVerificationCode(
        user.id,
        user.email,
      );
    });

    const result = await step.run("send-verification-email", async () => {
      return await sendEmailVerification(
        user.username,
        user.email,
        verificationCode,
      );
    });

    if (result.error) {
      throw new Error("Failed to send verification email: " + result.error);
    }

    return { event, body: result };
  },
);
