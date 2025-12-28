import getAuth from "@/features/auth/queries/get-auth";
import { signInPath } from "@/path";
import { redirect } from "next/navigation";

const AuthenticatedLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { user } = await getAuth();

  if (!user) {
    redirect(signInPath());
  }

  return <>{children}</>;
};

export default AuthenticatedLayout;
