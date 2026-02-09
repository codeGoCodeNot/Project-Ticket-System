import Heading from "@/components/heading";
import Spinner from "@/components/spinner";
import OrganizationList from "@/features/organization/components/organization-list";
import { Suspense } from "react";

const OrganizationsPage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="Organizations" desc="All your organizations" />

      <Suspense fallback={<Spinner />}>
        <OrganizationList />
      </Suspense>
    </div>
  );
};

export default OrganizationsPage;
