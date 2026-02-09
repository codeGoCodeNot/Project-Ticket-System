import Heading from "@/components/heading";
import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import OrganizationList from "@/features/organization/components/organization-list";
import getOrganizationsByUser from "@/features/organization/queries/get-organizations-by-user";
import { onBoardingPath, organizationsPath } from "@/path";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

const SelectActiveOrganizationPage = async () => {
  const organizations = await getOrganizationsByUser();

  const hasActive = organizations.some(
    (organization) => organization.membershipByUser.isActive,
  );

  if (hasActive) redirect(organizationsPath());

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="Select Organizations"
        desc="Pick one of your organizations to continue."
        actions={
          <Button asChild>
            <Link href={onBoardingPath()}>+ Create Organization</Link>
          </Button>
        }
      />

      <Suspense fallback={<Spinner />}>
        <OrganizationList />
      </Suspense>
    </div>
  );
};

export default SelectActiveOrganizationPage;
