import { emailVerificationPath, signInPath } from "@/path";
import { redirect } from "next/navigation";
import getAuth from "./get-auth";

type GetAuthOrRedirectOptions = {
  checkEmailVerified?: boolean;
};

const getAuthOrRedirect = async (options?: GetAuthOrRedirectOptions) => {
  const { checkEmailVerified = true } = options ?? {};

  const auth = await getAuth();

  if (!auth.user) redirect(signInPath());

  if (checkEmailVerified && !auth.user.emailVerified)
    redirect(emailVerificationPath());

  return auth;
};

export default getAuthOrRedirect;
