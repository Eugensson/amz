import Link from "next/link";
import { Metadata } from "next";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/shared/pagination";
import { DeleteDialog } from "@/components/shared/delete-dialog";

import { auth } from "@/auth";

import { formatId } from "@/lib/utils";
import { IUser } from "@/lib/db/models/user.model";
import { deleteUser, getAllUsers } from "@/lib/actions/user.actions";

export const metadata: Metadata = {
  title: "Admin Users",
};

const AdminUser = async (props: {
  searchParams: Promise<{ page: string }>;
}) => {
  const session = await auth();
  const searchParams = await props.searchParams;

  if (session?.user.role !== "Admin")
    throw new Error("Admin permission required");

  const page = Number(searchParams.page) || 1;

  const users = await getAllUsers({
    page,
  });

  return (
    <div className="space-y-2">
      <h1 className="h1-bold">Users</h1>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.data.map((user: IUser) => (
              <TableRow key={user._id}>
                <TableCell>{formatId(user._id)}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell className="flex gap-1">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/admin/users/${user._id}`}>Edit</Link>
                  </Button>
                  <DeleteDialog id={user._id} action={deleteUser} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {users?.totalPages > 1 && (
          <Pagination page={page} totalPages={users?.totalPages} />
        )}
      </div>
    </div>
  );
};

export default AdminUser;
