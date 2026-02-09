import SubmitButton from "@/components/form/submit-button";
import { Button } from "@/components/ui/button";
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

const OrganizationList = async () => {
  const organizations = await getOrganizationsByUser();
  const hasActive = organizations.some(
    (organization) => organization.membershipByUser.isActive,
  );

  return (
    <div className="w-full overflow-x-auto">
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
              <Button variant="outline" size="icon">
                <LucideArrowUpRightFromSquare className="w-4 h-4" />
              </Button>
            );

            const editButton = (
              <Button variant="outline" size="icon">
                <LucidePen className="w-4 h-4" />
              </Button>
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
                <TableCell className="flex flex-wrap justify-end gap-2 sm:flex-nowrap">
                  {switchButton}
                  {detailButton}
                  {editButton}
                  {deleteButton}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrganizationList;
