import Link from "next/link";
import { notFound } from "next/navigation";

import { OrderDetailsForm } from "@/components/shared/order/order-details-form";

import { auth } from "@/auth";
import { formatId } from "@/lib/utils";
import { getOrderById } from "@/lib/actions/order.actions";

export const generateMetadata = async (props: {
  params: Promise<{ id: string }>;
}) => {
  const params = await props.params;

  return {
    title: `Order ${formatId(params.id)}`,
  };
};

const OrderDetailsPage = async (props: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const params = await props.params;

  const { id } = params;

  const order = await getOrderById(id);
  if (!order) notFound();

  const session = await auth();

  return (
    <>
      <div className="flex gap-2">
        <Link href="/account">Your Account</Link>
        <span>›</span>
        <Link href="/account/orders">Your Orders</Link>
        <span>›</span>
        <span>Order {formatId(order._id)}</span>
      </div>
      <h1 className="h1-bold py-4">Order {formatId(order._id)}</h1>
      <OrderDetailsForm
        order={order}
        isAdmin={session?.user?.role === "Admin" || false}
      />
    </>
  );
};

export default OrderDetailsPage;