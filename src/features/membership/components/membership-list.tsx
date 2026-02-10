import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
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
          <Card key={membership.userId}>
            <CardContent className="space-y-3">
              <div>
                <div className="text-sm font-medium text-muted-foreground">
                  Username
                </div>
                <div className="mt-1">
                  {membership.user.username}
                  {membership.userId === currentUserId && (
                    <span
                      className="ml-1 text-xs text-muted-foreground"
                      title="That's you!"
                    >
                      (you)
                    </span>
                  )}
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-muted-foreground">
                  Email
                </div>
                <div className="mt-1">{membership.user.email}</div>
              </div>

              <div>
                <div className="text-sm font-medium text-muted-foreground">
                  Verified Email
                </div>
                <div className="mt-1">
                  {membership.user.emailVerified ? (
                    <LucideCheck />
                  ) : (
                    <LucideBan />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
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
