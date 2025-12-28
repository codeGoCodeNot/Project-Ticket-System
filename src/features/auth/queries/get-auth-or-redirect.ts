import { signInPath } from "@/path";
import { redirect } from "next/navigation";
import getAuth from "./get-auth";

const getAuthOrRedirect = async () => {
  const auth = await getAuth();

  if (!auth.user) {
    redirect(signInPath());
  }

  return auth;
};

export default getAuthOrRedirect;
