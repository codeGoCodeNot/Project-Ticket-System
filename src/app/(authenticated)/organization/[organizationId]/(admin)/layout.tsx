import { getAdminOrRedirect } from "@/features/membership/queries/get-admin-or-redirect";
import AdminBadge from "@/components/admin-badge";

const AuthenticatedLayout = async ({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{
    organizationId: string;
  }>;
}>) => {
  const { organizationId } = await params;

  await getAdminOrRedirect(organizationId);

  return (
    <div className="flex flex-col gap-y-4">
      <div className="px-4 sm:px-8 pt-4">
        <AdminBadge />
      </div>
      {children}
    </div>
  );
};

export default AuthenticatedLayout;
