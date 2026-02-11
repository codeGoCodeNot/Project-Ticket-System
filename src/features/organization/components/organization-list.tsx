import SubmitButton from "@/components/form/submit-button";
import { Button } from "@/components/ui/button";
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
import MembershipDeleteButton from "@/features/membership/components/membership-delete-button";
import { membershipPath } from "@/path";
import { format } from "date-fns";
import {
  LucideArrowLeftRight,
  LucideArrowUpRightFromSquare,
  LucidePen,
} from "lucide-react";
import Link from "next/link";
import getOrganizationsByUser from "../queries/get-organizations-by-user";
import OrganizationDeleteButton from "./organization-delete-button";
import OrganizationRenameDialog from "./organization-rename-dialog";
import OrganizationSwitchButton from "./organization-switch-button";

type OrganizationListProps = {
  limitedAccess?: boolean;
};

const OrganizationList = async ({ limitedAccess }: OrganizationListProps) => {
  const organizations = await getOrganizationsByUser();
  const hasActive = organizations.some(
    (organization) => organization.membershipByUser.isActive,
  );
  const placeholder = (
    <Button size="icon" disabled className="disabled:opacity-0"></Button>
  );

  return (
    <>
      {/* Mobile/Card view */}
      <section className="lg:hidden flex flex-col items-center space-y-4">
        {organizations.map((organization) => {
          const isActive = organization.membershipByUser.isActive;
          const joinedAt = format(
            organization.membershipByUser.joinedAt,
            "yyyy-MM-dd, HH:mm",
          );

          const switchButton = (
            <OrganizationSwitchButton
              organizationId={organization.id}
              trigger={
                <SubmitButton
                  label={
                    !hasActive ? "Activate" : isActive ? "Active" : "Switch"
                  }
                  variant={
                    !hasActive ? "secondary" : isActive ? "default" : "outline"
                  }
                  icon={<LucideArrowLeftRight />}
                />
              }
            />
          );

          const detailButton = (
            <Button variant="outline" size="icon" asChild>
              <Link href={membershipPath(organization.id)}>
                <LucideArrowUpRightFromSquare />
              </Link>
            </Button>
          );

          const editButton = (
            <OrganizationRenameDialog
              organizationId={organization.id}
              currentName={organization.name}
            />
          );

          const leaveButton = (
            <MembershipDeleteButton
              organizationId={organization.id}
              userId={organization.membershipByUser.userId}
            />
          );

          const deleteButton = (
            <OrganizationDeleteButton organizationId={organization.id} />
          );

          const isAdmin =
            organization.membershipByUser.membershipRole === "ADMIN";

          return (
            <div
              key={organization.id}
              className="w-full max-w-[420px] flex gap-x-1"
            >
              <Card className="w-full">
                <CardHeader>
                  <CardTitle className="flex gap-x-2 items-center">
                    <span>{organization.name}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>{switchButton}</CardContent>
                <CardFooter className="flex justify-between text-sm text-muted-foreground">
                  <div className="flex gap-x-3">
                    <span>{joinedAt}</span>
                    <span>{organization._count.memberships} members</span>
                  </div>
                  <span className="capitalize">
                    {organization.membershipByUser.membershipRole.toLowerCase()}
                  </span>
                </CardFooter>
              </Card>
              <div className="flex flex-col gap-y-1">
                {limitedAccess ? null : isAdmin ? detailButton : null}
                {limitedAccess ? null : isAdmin ? editButton : null}
                {limitedAccess ? null : leaveButton}
                {limitedAccess ? null : isAdmin ? deleteButton : null}
              </div>
            </div>
          );
        })}
      </section>

      {/* Desktop/Table view */}
      <div className="hidden lg:block w-full overflow-x-auto">
        <Table>
          <TableCaption>A list of your organizations.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden sm:table-cell">Id</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">Joined At</TableHead>
              <TableHead className="hidden md:table-cell">Members</TableHead>
              <TableHead className="hidden md:table-cell">Role</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {organizations.map((organization) => {
              const isActive = organization.membershipByUser.isActive;
              const isAdmin =
                organization.membershipByUser.membershipRole === "ADMIN";
              const switchButton = (
                <OrganizationSwitchButton
                  organizationId={organization.id}
                  trigger={
                    <SubmitButton
                      label={
                        !hasActive ? "Activate" : isActive ? "Active" : "Switch"
                      }
                      variant={
                        !hasActive
                          ? "secondary"
                          : isActive
                            ? "default"
                            : "outline"
                      }
                      icon={<LucideArrowLeftRight />}
                    />
                  }
                />
              );

              const detailButton = (
                <Button variant="outline" size="icon" asChild>
                  <Link href={membershipPath(organization.id)}>
                    <LucideArrowUpRightFromSquare />
                  </Link>
                </Button>
              );

              const editButton = (
                <OrganizationRenameDialog
                  organizationId={organization.id}
                  currentName={organization.name}
                />
              );

              const leaveButton = (
                <MembershipDeleteButton
                  organizationId={organization.id}
                  userId={organization.membershipByUser.userId}
                />
              );

              const deleteButton = (
                <OrganizationDeleteButton organizationId={organization.id} />
              );
              const joinedAt = format(
                organization.membershipByUser.joinedAt,
                "yyyy-MM-dd, HH:mm",
              );

              return (
                <TableRow key={organization.id}>
                  <TableCell className="hidden sm:table-cell align-middle">
                    {organization.id}
                  </TableCell>
                  <TableCell className="align-middle">
                    <div className="font-medium">{organization.name}</div>
                    <div className="mt-1 space-y-0.5 text-xs text-muted-foreground md:hidden">
                      <div>Joined: {joinedAt}</div>
                      <div>Members: {organization._count.memberships}</div>
                      <div className="capitalize">
                        Role:{" "}
                        {organization.membershipByUser.membershipRole.toLowerCase()}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell align-middle">
                    {joinedAt}
                  </TableCell>
                  <TableCell className="hidden md:table-cell align-middle">
                    {organization._count.memberships}
                  </TableCell>
                  <TableCell className="hidden md:table-cell capitalize align-middle">
                    {organization.membershipByUser.membershipRole.toLowerCase()}
                  </TableCell>
                  <TableCell className="flex flex-wrap justify-end gap-x-1 lg:flex-nowrap align-middle">
                    {switchButton}
                    {limitedAccess
                      ? null
                      : isAdmin
                        ? detailButton
                        : placeholder}
                    {limitedAccess ? null : isAdmin ? editButton : placeholder}
                    {limitedAccess ? null : leaveButton}
                    {limitedAccess
                      ? null
                      : isAdmin
                        ? deleteButton
                        : placeholder}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default OrganizationList;
