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
