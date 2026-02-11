import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import getAuthOrRedirect from "@/features/auth/queries/get-auth-or-redirect";
import { LucideBan, LucideCheck } from "lucide-react";
import getMemberships from "../queries/get-memberships";
import MembershipDeleteButton from "./membership-delete-button";
import MembershipMoreMenu from "./membership-more-menu";

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
      <section className="sm:hidden flex flex-col items-center space-y-4">
        {memberships.map((membership) => (
          <div
            key={membership.userId}
            className="w-full max-w-[420px] flex gap-x-1"
          >
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="flex gap-x-2 items-center">
                  <span>
                    {membership.user.username}
                    {membership.userId === currentUserId && (
                      <span
                        className="ml-1 text-xs text-muted-foreground font-normal"
                        title="That's you!"
                      >
                        (you)
                      </span>
                    )}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center gap-x-2">
                <span className="text-sm text-muted-foreground">
                  Email verified:
                </span>
                {membership.user.emailVerified ? (
                  <LucideCheck className="h-4 w-4 text-green-600" />
                ) : (
                  <LucideBan className="h-4 w-4 text-red-600" />
                )}
              </CardContent>
              <CardFooter className="flex justify-between text-sm text-muted-foreground">
                <span>{membership.user.email}</span>
                <span className="capitalize">
                  {membership.membershipRole.toLowerCase()}
                </span>
              </CardFooter>
            </Card>
            <div className="flex flex-col gap-y-1">
              <MembershipMoreMenu
                userId={membership.userId}
                organizationId={membership.organizationId}
                membershipRole={membership.membershipRole}
              />
              <MembershipDeleteButton
                organizationId={organizationId}
                userId={membership.userId}
                currentUserId={currentUserId}
              />
            </div>
          </div>
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
            <TableHead>Role</TableHead>
            <TableHead>Actions</TableHead>
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
              <TableCell>{membership.membershipRole}</TableCell>
              <TableCell className="flex gap-x-1">
                <MembershipMoreMenu
                  userId={membership.userId}
                  organizationId={membership.organizationId}
                  membershipRole={membership.membershipRole}
                />
                <MembershipDeleteButton
                  organizationId={organizationId}
                  userId={membership.userId}
                  currentUserId={currentUserId}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default MembershipList;
