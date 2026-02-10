import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import getMemberships from "../queries/get-memberships";
import { LucideBan, LucideCheck } from "lucide-react";
import getAuthOrRedirect from "@/features/auth/queries/get-auth-or-redirect";

type MembershipListProps = {
  organizationId: string;
  currentUserId?: string;
};

const MembershipList = async ({ organizationId }: MembershipListProps) => {
  const memberships = await getMemberships(organizationId);
  const { user } = await getAuthOrRedirect();
  const currentUserId = user.id;

  return (
    <>
      {/* Mobile view - vertical cards */}
      <section className="sm:hidden space-y-4">
        {memberships.map((membership) => (
          <article
            key={membership.userId}
            className="border rounded-lg p-4 space-y-2"
          >
            <dl>
              <dt className="text-sm font-medium text-muted-foreground">
                Username
              </dt>
              <dd className="mb-2">
                {membership.user.username}
                {membership.userId === currentUserId && (
                  <span
                    className="ml-1 text-xs text-muted-foreground"
                    title="That's you!"
                  >
                    (you)
                  </span>
                )}
              </dd>

              <dt className="text-sm font-medium text-muted-foreground">
                Email
              </dt>
              <dd className="mb-2">{membership.user.email}</dd>

              <dt className="text-sm font-medium text-muted-foreground">
                Verified Email
              </dt>
              <dd>
                {membership.user.emailVerified ? (
                  <LucideCheck />
                ) : (
                  <LucideBan />
                )}
              </dd>
            </dl>
          </article>
        ))}
      </section>

      {/* Desktop view - table */}
      <Table className="hidden sm:table">
        <TableCaption>A list of your organizations.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Verified Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {memberships.map((membership) => (
            <TableRow key={membership.userId}>
              <TableCell>
                {membership.user.username}
                {membership.userId === currentUserId && (
                  <span
                    className="ml-1 text-xs text-muted-foreground"
                    title="That's you!"
                  >
                    (you)
                  </span>
                )}
              </TableCell>
              <TableCell>{membership.user.email}</TableCell>
              <TableCell>
                {membership.user.emailVerified ? (
                  <LucideCheck />
                ) : (
                  <LucideBan />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default MembershipList;
