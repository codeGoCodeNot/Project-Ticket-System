"use client";

import { consumeCookieByKey, deleteCookieByKey } from "@/actions/cookies";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const RedirectToast = () => {
  const pathname = usePathname();

  useEffect(() => {
    const showCookieToast = async () => {
      const message = await consumeCookieByKey("toast");

      if (message) {
        toast.success(message);
        await deleteCookieByKey("toast");
      }
    };

    showCookieToast();
  }, [pathname]);

  return null;
};

export default RedirectToast;
