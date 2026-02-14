"use client";

import Breadcrumbs from "@/components/breadcrumbs";
import { invitationsPath, membershipPath, organizationsPath } from "@/path";
import { useParams, usePathname } from "next/navigation";

const OrganizationBreadcrumbs = () => {
  const params = useParams<{ organizationId: string }>();
  const pathname = usePathname();

  const title = {
    memberships: "Memberships" as const,

    invitations: "Invitations" as const,
  }[pathname.split("/").at(-1) as "memberships" | "invitations"];

  return (
    <Breadcrumbs
      breadcrumbs={[
        { title: "Organization", href: organizationsPath() },
        {
          title,
          dropdown: [
            {
              title: "Memberships",
              href: membershipPath(params.organizationId),
            },
            {
              title: "Invitations",
              href: invitationsPath(params.organizationId),
            },
          ],
        },
      ]}
    />
  );
};

export default OrganizationBreadcrumbs;
