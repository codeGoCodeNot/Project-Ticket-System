import Heading from "@/components/heading";
import MembershipSkeleton from "@/components/membership-skeleton";
import MembershipList from "@/features/membership/components/membership-list";
import getOrganizationById from "@/features/organization/queries/get-organization-by-id";
import { Suspense } from "react";
import OrganizationBreadcrumbs from "../_navigation/tabs";
import { notFound } from "next/navigation";

type MembershipPageProps = {
  params: Promise<{ organizationId: string }>;
};

const MembershipPage = async ({ params }: MembershipPageProps) => {
  const { organizationId } = await params;
  const organization = await getOrganizationById(organizationId);

  if (!organization) {
    notFound();
  }

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="Membership"
        desc="Manage members in your organization"
        tabs={<OrganizationBreadcrumbs organizationName={organization.name} />}
      />
      <Suspense fallback={<MembershipSkeleton />}>
        <MembershipList organizationId={organizationId} />
      </Suspense>
    </div>
  );
};

export default MembershipPage;
