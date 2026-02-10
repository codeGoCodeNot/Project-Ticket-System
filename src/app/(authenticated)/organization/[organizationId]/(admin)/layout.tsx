import { getAdminOrRedirect } from "@/features/membership/queries/get-admin-or-redirect";

const AuthenticatedLayout = async ({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{
    organizationId: string;
    admin: string;
  }>;
}>) => {
  const { organizationId } = await params;

  await getAdminOrRedirect(organizationId);

  return <>{children}</>;
};

export default AuthenticatedLayout;
