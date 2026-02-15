import Heading from "@/components/heading";
import Spinner from "@/components/spinner";
import InvitationList from "@/features/invitation/components/invitation-list";
import getOrganizationById from "@/features/organization/queries/get-organization-by-id";
import { Suspense } from "react";
import OrganizationBreadcrumbs from "../_navigation/tabs";
import { notFound } from "next/navigation";
import InvitationCreateButton from "@/features/invitation/components/invitation-create-button";

type InvitationsPageProps = {
  params: Promise<{ organizationId: string }>;
};

const InvitationsPage = async ({ params }: InvitationsPageProps) => {
  const { organizationId } = await params;
  const organization = await getOrganizationById(organizationId);

  if (!organization) {
    notFound();
  }
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="Invitations"
        desc="Manages your organization's invitations"
        tabs={<OrganizationBreadcrumbs organizationName={organization.name} />}
        actions={<InvitationCreateButton organizationId={organizationId} />}
      />

      <Suspense fallback={<Spinner />}>
        <InvitationList organizationId={organizationId} />
      </Suspense>
    </div>
  );
};

export default InvitationsPage;
