import Link from "next/link";
import { Metadata } from "next";
import { Pencil } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DeleteDialog } from "@/components/shared/delete-dialog";

import { formatId } from "@/lib/utils";
import { IWebPage } from "@/lib/db/models/web-page.model";
import { deleteWebPage, getAllWebPages } from "@/lib/actions/web-page.actions";

export const metadata: Metadata = {
  title: "Admin Web Pages",
};

const WebPageAdminPage = async () => {
  const webPages = await getAllWebPages();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Web Pages</CardTitle>
        <CardDescription className="ml-auto">
          <Button asChild>
            <Link href="/admin/web-pages/create">Create WebPage</Link>
          </Button>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>IsPublished</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {webPages.map((webPage: IWebPage) => (
              <TableRow key={webPage._id}>
                <TableCell>{formatId(webPage._id)}</TableCell>
                <TableCell>{webPage.title}</TableCell>
                <TableCell>{webPage.slug}</TableCell>
                <TableCell>{webPage.isPublished ? "Yes" : "No"}</TableCell>
                <TableCell className="flex gap-1">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/admin/web-pages/${webPage._id}`}>
                      <Pencil size={20} />
                    </Link>
                  </Button>
                  <DeleteDialog id={webPage._id} action={deleteWebPage} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default WebPageAdminPage;
