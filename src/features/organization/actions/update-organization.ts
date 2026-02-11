"use server";

import fromErrorToActionState, {
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getAdminOrRedirect } from "@/features/membership/queries/get-admin-or-redirect";
import prisma from "@/lib/prisma";
import { organizationsPath } from "@/path";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const updateOrganizationSchema = z.object({
  name: z.string().min(1, "Organization name must not be empty").max(191),
});

const updateOrganization = async (organizationId: string, name: string) => {
  await getAdminOrRedirect(organizationId);

  try {
    const data = updateOrganizationSchema.parse({ name });

    await prisma.organization.update({
      where: {
        id: organizationId,
      },
      data: {
        name: data.name,
      },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath(organizationsPath());

  return toActionState("SUCCESS", "Organization renamed successfully!");
};

export default updateOrganization;
