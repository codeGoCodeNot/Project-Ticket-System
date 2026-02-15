import Placeholder from "@/components/placeholder";
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
import { format } from "date-fns";
import getInvitations from "../queries/get-invitations";
import InvitationDeleteButton from "./invitation-delete-button";

type InvitationListProps = {
  organizationId: string;
};

const InvitationList = async ({ organizationId }: InvitationListProps) => {
  const invitations = await getInvitations(organizationId);

  if (!invitations.length)
    return <Placeholder label="No invitations for this organization" />;

  return (
    <>
      {/* Mobile view - vertical cards */}
      <section className="sm:hidden flex flex-col items-center space-y-4">
        {invitations.map((invitation) => {
          const deleteButton = (
            <InvitationDeleteButton
              email={invitation.email}
              organizationId={invitation.organizationId}
            />
          );

          return (
            <div
              key={invitation.email}
              className="w-full max-w-[420px] flex gap-x-1"
            >
              <Card className="w-full">
                <CardHeader>
                  <CardTitle className="flex gap-x-2 items-center">
                    <span>{invitation.email}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center justify-between">
                    <span>Invited at</span>
                    <span>
                      {format(invitation.createdAt, "MMM dd, yyyy, HH:mm")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Invited by</span>
                    <span>{invitation.invitedByUser?.username}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  {deleteButton}
                </CardFooter>
              </Card>
            </div>
          );
        })}
      </section>

      {/* Desktop view - table */}
      <Table className="hidden sm:table">
        <TableCaption>A list of your invitations.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Invited At</TableHead>
            <TableHead>Invited By</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invitations.map((invitation) => {
            const deleteButton = (
              <InvitationDeleteButton
                email={invitation.email}
                organizationId={invitation.organizationId}
              />
            );

            const buttons = <>{deleteButton}</>;
            return (
              <TableRow key={invitation.email}>
                <TableCell>{invitation.email}</TableCell>
                <TableCell>
                  {format(invitation.createdAt, "MMM dd, yyyy, HH:mm")}
                </TableCell>
                <TableCell>{invitation.invitedByUser?.username}</TableCell>
                <TableCell className="flex gap-x-1">{buttons}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default InvitationList;
