"use server";

import { validateSession } from "@/lib/lucia";
import { cookies } from "next/headers";
import { cache } from "react";
import { SESSION_COOKIE_NAME } from "../utils/session-cookie";

const getAuth = cache(async () => {
  const sessionToken =
    (await cookies()).get(SESSION_COOKIE_NAME)?.value ?? null;

  if (!sessionToken) {
    return { session: null, user: null };
  }

  return await validateSession(sessionToken);
});
export default getAuth;
