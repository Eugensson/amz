"use server";

import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/db";
import Order from "@/lib/db/models/order.model";
import { formatError, round2 } from "@/lib/utils";
import { OrderInputSchema } from "@/lib/validator";
import { AVAILABLE_DELIVERY_DATES } from "@/lib/constants";
import { Cart, OrderItem, ShippingAddress } from "@/types";

export const createOrder = async (clientSideCart: Cart) => {
  try {
    await connectToDatabase();
    const session = await auth();
    if (!session) throw new Error("User not authenticated");

    const createdOrder = await createOrderFromCart(
      clientSideCart,
      session.user.id!
    );
    return {
      success: true,
      message: "Order placed successfully",
      data: { orderId: createdOrder._id.toString() },
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
};

export const createOrderFromCart = async (
  clientSideCart: Cart,
  userId: string
) => {
  const cart = {
    ...clientSideCart,
    ...calcDeliveryDateAndPrice({
      items: clientSideCart.items,
      shippingAddress: clientSideCart.shippingAddress,
      deliveryDateIndex: clientSideCart.deliveryDateIndex,
    }),
  };

  const order = OrderInputSchema.parse({
    user: userId,
    items: cart.items,
    shippingAddress: cart.shippingAddress,
    paymentMethod: cart.paymentMethod,
    itemsPrice: cart.itemsPrice,
    shippingPrice: cart.shippingPrice,
    taxPrice: cart.taxPrice,
    totalPrice: cart.totalPrice,
    expectedDeliveryDate: cart.expectedDeliveryDate,
  });
  return await Order.create(order);
};

export const calcDeliveryDateAndPrice = async ({
  items,
  shippingAddress,
  deliveryDateIndex,
}: {
  items: OrderItem[];
  deliveryDateIndex?: number;
  shippingAddress?: ShippingAddress;
}) => {
  const itemsPrice = round2(
    items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  );

  const deliveryDate =
    AVAILABLE_DELIVERY_DATES[
      deliveryDateIndex === undefined
        ? AVAILABLE_DELIVERY_DATES.length - 1
        : deliveryDateIndex
    ];

  const shippingPrice =
    !shippingAddress || !deliveryDate
      ? undefined
      : deliveryDate.freeShippingMinPrice > 0 &&
        itemsPrice >= deliveryDate.freeShippingMinPrice
      ? 0
      : deliveryDate.shippingPrice;

  const taxPrice = !shippingAddress ? undefined : round2(itemsPrice * 0.15);

  const totalPrice = round2(
    itemsPrice +
      (shippingPrice ? round2(shippingPrice) : 0) +
      (taxPrice ? round2(taxPrice) : 0)
  );

  return {
    AVAILABLE_DELIVERY_DATES,
    deliveryDateIndex:
      deliveryDateIndex === undefined
        ? AVAILABLE_DELIVERY_DATES.length - 1
        : deliveryDateIndex,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  };
};
