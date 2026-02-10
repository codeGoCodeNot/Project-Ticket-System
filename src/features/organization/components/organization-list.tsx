import SubmitButton from "@/components/form/submit-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import {
  LucideArrowLeftRight,
  LucideArrowUpRightFromSquare,
  LucidePen,
} from "lucide-react";
import getOrganizationsByUser from "../queries/get-organizations-by-user";
import OrganizationDeleteButton from "./organization-delete-button";
import OrganizationSwitchButton from "./organization-switch-button";
import Link from "next/link";
import { membershipPath } from "@/path";
import MembershipDeleteButton from "@/features/membership/components/membership-delete-button";

type OrganizationListProps = {
  limitedAccess?: boolean;
};

const OrganizationList = async ({ limitedAccess }: OrganizationListProps) => {
  const organizations = await getOrganizationsByUser();
  const hasActive = organizations.some(
    (organization) => organization.membershipByUser.isActive,
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
            <Button variant="outline" size="icon">
              <LucidePen />
            </Button>
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

          return (
            <div
              key={organization.id}
              className="w-full max-w-[420px] flex gap-x-1"
            >
              <Card className="w-full">
                <CardContent className="space-y-3">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">
                      Name
                    </div>
                    <div className="mt-1 font-medium">{organization.name}</div>
                  </div>

                  <div>
                    <div className="text-sm font-medium text-muted-foreground">
                      Joined At
                    </div>
                    <div className="mt-1">{joinedAt}</div>
                  </div>

                  <div>
                    <div className="text-sm font-medium text-muted-foreground">
                      Members
                    </div>
                    <div className="mt-1">
                      {organization._count.memberships}
                    </div>
                  </div>

                  <div className="pt-2">{switchButton}</div>
                </CardContent>
              </Card>
              <div className="flex flex-col gap-y-1">
                {limitedAccess ? null : detailButton}
                {limitedAccess ? null : editButton}
                {limitedAccess ? null : leaveButton}
                {limitedAccess ? null : deleteButton}
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
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {organizations.map((organization) => {
              const isActive = organization.membershipByUser.isActive;

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
                <Button variant="outline" size="icon">
                  <LucidePen />
                </Button>
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
                  <TableCell className="hidden sm:table-cell">
                    {organization.id}
                  </TableCell>
                  <TableCell className="align-top">
                    <div className="font-medium">{organization.name}</div>
                    <div className="mt-1 space-y-0.5 text-xs text-muted-foreground md:hidden">
                      <div>Joined: {joinedAt}</div>
                      <div>Members: {organization._count.memberships}</div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {joinedAt}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {organization._count.memberships}
                  </TableCell>
                  <TableCell className="flex flex-wrap justify-end gap-2 lg:flex-nowrap">
                    {switchButton}
                    {limitedAccess ? null : detailButton}
                    {limitedAccess ? null : editButton}
                    {limitedAccess ? null : leaveButton}
                    {limitedAccess ? null : deleteButton}
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
