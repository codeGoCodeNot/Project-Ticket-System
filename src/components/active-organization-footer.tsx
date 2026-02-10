import ActiveOrganizationDropdown from "@/components/active-organization-dropdown";
import getAuth from "@/features/auth/queries/get-auth";
import getOrganizationsByUser from "@/features/organization/queries/get-organizations-by-user";

const ActiveOrganizationFooter = async () => {
  const { user } = await getAuth();

  if (!user) return null;

  const organizations = await getOrganizationsByUser();
  const activeOrganization = organizations.find(
    (organization) => organization.membershipByUser.isActive,
  );

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-2 text-xs text-muted-foreground sm:px-7">
        <div className="min-w-0">
          <span className="font-medium text-foreground">
            Active organization:
          </span>{" "}
          <span className="truncate">
            {activeOrganization ? activeOrganization.name : "None selected"}
          </span>
          {activeOrganization && (
            <span className="ml-2 text-[10px] capitalize">
              (
              {activeOrganization.membershipByUser.membershipRole.toLowerCase()}
              )
            </span>
          )}
        </div>
        <ActiveOrganizationDropdown
          organizations={organizations}
          activeOrganizationId={activeOrganization?.id}
          activeOrganizationName={activeOrganization?.name}
        />
      </div>
    </div>
  );
};

export default ActiveOrganizationFooter;
