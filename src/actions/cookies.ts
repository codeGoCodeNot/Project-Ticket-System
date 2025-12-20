"use server";
import { cookies } from "next/headers";

export const getCookieByKey = async (key: string) => {
  const cookiesStore = await cookies();
  const cookie = cookiesStore.get(key);

  if (!cookie) {
    return null;
  }
  return cookie.value;
};

export const setCookieByKey = async (key: string, value: string) => {
  const cookiesStore = await cookies();
  cookiesStore.set(key, value);
};

export const deleteCookieByKey = async (key: string) => {
  const cookiesStore = await cookies();
  cookiesStore.delete(key);
};

export const consumeCookieByKey = async (key: string) => {
  const message = await getCookieByKey(key);

  await deleteCookieByKey(key);

  return message;
};
