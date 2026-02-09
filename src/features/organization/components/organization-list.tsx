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
  LucideTrash,
} from "lucide-react";
import getOrganizationsByUser from "../queries/get-organizations-by-user";

const OrganizationList = async () => {
  const organizations = await getOrganizationsByUser();

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
            const switchButton = (
              <Button variant="outline" size="icon">
                <LucideArrowLeftRight />
              </Button>
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
              <Button variant="destructive" size="icon">
                <LucideTrash className="w-4 h-4" />
              </Button>
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
