"use server";

import { setCookieByKey } from "@/actions/cookies";
import fromErrorToActionState, {
  ActionState,
} from "@/components/form/utils/to-action-state";
import getAuthOrRedirect from "@/features/auth/queries/get-auth-or-redirect";
import prisma from "@/lib/prisma";
import { ticketsPath } from "@/path";
import { redirect } from "next/navigation";
import { z } from "zod";

const createOrganizationSchema = z.object({
  name: z.string().min(1, "Organization name must not be empty").max(191),
});

const createOrganization = async (
  _actionState: ActionState,
  formData: FormData,
) => {
  const { user } = await getAuthOrRedirect();

  try {
    const data = createOrganizationSchema.parse(Object.fromEntries(formData));

    await prisma.organization.create({
      data: {
        ...data,
        memberships: {
          create: {
            userId: user.id,
          },
        },
      },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  await setCookieByKey("toast", "Organization created successfully!");
  redirect(ticketsPath());
};

export default createOrganization;
