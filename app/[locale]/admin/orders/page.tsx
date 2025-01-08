import Link from "next/link";
import { Metadata } from "next";
import { Info } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Pagination } from "@/components/shared/pagination";
import { DeleteDialog } from "@/components/shared/delete-dialog";
import { ProductPrice } from "@/components/shared/product/product-price";

import { auth } from "@/auth";
import { IOrderList } from "@/types";
import { formatDateTime, formatId } from "@/lib/utils";
import { deleteOrder, getAllOrders } from "@/lib/actions/order.actions";

export const metadata: Metadata = {
  title: "Admin Orders",
};

const OrdersPage = async (props: {
  searchParams: Promise<{ page: string }>;
}) => {
  const searchParams = await props.searchParams;

  const { page = "1" } = searchParams;

  const session = await auth();

  if (session?.user.role !== "Admin")
    throw new Error("Admin permission required");

  const orders = await getAllOrders({
    page: Number(page),
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders</CardTitle>
        <CardDescription>Orders Description</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Buyer</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Paid</TableHead>
              <TableHead>Delivered</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.data.map((order: IOrderList) => (
              <TableRow key={order._id}>
                <TableCell>{formatId(order._id)}</TableCell>
                <TableCell>
                  {formatDateTime(order.createdAt!).dateTime}
                </TableCell>
                <TableCell>
                  {order.user ? order.user.name : "Deleted User"}
                </TableCell>
                <TableCell>
                  {" "}
                  <ProductPrice price={order.totalPrice} plain />
                </TableCell>
                <TableCell>
                  {order.isPaid && order.paidAt
                    ? formatDateTime(order.paidAt).dateTime
                    : "No"}
                </TableCell>
                <TableCell>
                  {order.isDelivered && order.deliveredAt
                    ? formatDateTime(order.deliveredAt).dateTime
                    : "No"}
                </TableCell>
                <TableCell className="flex gap-1">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/admin/orders/${order._id}`}>
                      <Info size={20} />
                    </Link>
                  </Button>
                  <DeleteDialog id={order._id} action={deleteOrder} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        {orders.totalPages > 1 && (
          <Pagination page={page} totalPages={orders.totalPages!} />
        )}
      </CardFooter>
    </Card>
  );
};

export default OrdersPage;
