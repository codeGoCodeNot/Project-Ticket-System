import { emailVerificationPath, onBoardingPath, signInPath } from "@/path";
import { redirect } from "next/navigation";
import getAuth from "./get-auth";
import getOrganizationsByUser from "@/features/organization/queries/get-organizations-by-user";

type GetAuthOrRedirectOptions = {
  checkEmailVerified?: boolean;
  checkOrganization?: boolean;
};

const getAuthOrRedirect = async (options?: GetAuthOrRedirectOptions) => {
  const { checkEmailVerified = true, checkOrganization = true } = options ?? {};

  const auth = await getAuth();

  if (!auth.user) redirect(signInPath());

  if (checkEmailVerified && !auth.user.emailVerified)
    redirect(emailVerificationPath());

  if (checkOrganization) {
    const organizations = await getOrganizationsByUser();
    if (!organizations.length) redirect(onBoardingPath());
  }

  return auth;
};

export default getAuthOrRedirect;
