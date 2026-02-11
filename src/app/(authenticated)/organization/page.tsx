import Heading from "@/components/heading";
import OrganizationSkeleton from "@/components/organization-skeleton";
import { Button } from "@/components/ui/button";
import OrganizationList from "@/features/organization/components/organization-list";
import { organizationCreatePath } from "@/path";
import Link from "next/link";
import { Suspense } from "react";

const OrganizationsPage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="Organizations"
        desc="All your organizations"
        actions={
          <Button asChild>
            <Link href={organizationCreatePath()}>+ Create Organization</Link>
          </Button>
        }
      />

      <Suspense fallback={<OrganizationSkeleton />}>
        <OrganizationList />
      </Suspense>
    </div>
  );
};

export default OrganizationsPage;
