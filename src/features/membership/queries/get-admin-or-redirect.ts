import getAuthOrRedirect from "@/features/auth/queries/get-auth-or-redirect";
import getMembership from "./get-membership";
import { redirect } from "next/navigation";
import { signInPath } from "@/path";

export const getAdminOrRedirect = async (organizationId: string) => {
  const auth = await getAuthOrRedirect();

  const membership = await getMembership({
    organizationId,
    userId: auth.user.id,
  });

  if (!membership || membership.membershipRole !== "ADMIN") {
    redirect(signInPath());
  }

  return { ...auth, membership };
};
