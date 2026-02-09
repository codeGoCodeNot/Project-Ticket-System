import {
  emailVerificationPath,
  onBoardingPath,
  selectActiveOrganizationPath,
  signInPath,
} from "@/path";
import { redirect } from "next/navigation";
import getAuth from "./get-auth";
import getOrganizationsByUser from "@/features/organization/queries/get-organizations-by-user";

type GetAuthOrRedirectOptions = {
  checkEmailVerified?: boolean;
  checkOrganization?: boolean;
  checkActiveOrganization?: boolean;
};

const getAuthOrRedirect = async (options?: GetAuthOrRedirectOptions) => {
  const {
    checkEmailVerified = true,
    checkOrganization = true,
    checkActiveOrganization = true,
  } = options ?? {};

  const auth = await getAuth();

  if (!auth.user) redirect(signInPath());

  if (checkEmailVerified && !auth.user.emailVerified)
    redirect(emailVerificationPath());

  if (checkOrganization || checkActiveOrganization) {
    const organizations = await getOrganizationsByUser();

    if (checkOrganization && !organizations.length) redirect(onBoardingPath());

    const hasActive = organizations.some(
      (organization) => organization.membershipByUser.isActive,
    );

    if (checkActiveOrganization && !hasActive)
      redirect(selectActiveOrganizationPath());
  }

  return auth;
};

export default getAuthOrRedirect;
