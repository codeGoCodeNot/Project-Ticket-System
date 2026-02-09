import Heading from "@/components/heading";
import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import OrganizationList from "@/features/organization/components/organization-list";
import { onBoardingPath } from "@/path";
import Link from "next/link";
import { Suspense } from "react";

const SelectActiveOrganizationPage = () => {
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
