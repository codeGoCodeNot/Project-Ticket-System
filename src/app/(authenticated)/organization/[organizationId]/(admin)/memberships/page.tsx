import Heading from "@/components/heading";
import MembershipSkeleton from "@/components/membership-skeleton";
import MembershipList from "@/features/membership/components/membership-list";
import { Suspense } from "react";
import OrganizationBreadcrumbs from "../_navigation/tabs";

type MembershipPageProps = {
  params: Promise<{ organizationId: string }>;
};

const MembershipPage = async ({ params }: MembershipPageProps) => {
  const { organizationId } = await params;

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="Membership"
        desc="Manage members in your organization"
        tabs={<OrganizationBreadcrumbs />}
      />
      <Suspense fallback={<MembershipSkeleton />}>
        <MembershipList organizationId={organizationId} />
      </Suspense>
    </div>
  );
};

export default MembershipPage;
