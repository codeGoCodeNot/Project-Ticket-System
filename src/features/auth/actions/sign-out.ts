"use server";

import getAuth from "@/features/auth/queries/get-auth";
import { invalidateSession } from "@/lib/lucia";
import { signInPath } from "@/path";
import { redirect } from "next/navigation";
import { deleteSessionCookie } from "../utils/session-cookie";

const signOut = async () => {
  const { session } = await getAuth();

  if (!session) {
    redirect(signInPath());
  }

  await invalidateSession(session.id);
  await deleteSessionCookie();

  redirect(signInPath());
};

export default signOut;
