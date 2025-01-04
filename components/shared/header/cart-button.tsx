"use client";

import Link from "next/link";
import { ShoppingCartIcon } from "lucide-react";

import useCartStore from "@/hooks/use-cart-store";
import useIsMounted from "@/hooks/use-is-mounted";
import useCartSidebar from "@/hooks/use-cart-sidebar";

import { cn } from "@/lib/utils";

export const CartButton = () => {
  const isMounted = useIsMounted();
  const isCartSidebarOpen = useCartSidebar();
  const {
    cart: { items },
  } = useCartStore();
  const cartItemsCount = items.reduce((a, c) => a + c.quantity, 0);

  return (
    <Link href="/cart" className="px-1 header-button">
      <div className="flex items-end text-xs relative">
        <ShoppingCartIcon size={32} />

        {isMounted && (
          <span
            className={cn(
              `bg-black px-1 rounded-full text-primary text-base font-bold absolute right-[30px] top-[-4px] z-10`,
              cartItemsCount >= 10 && "text-sm px-0 p-[1px]"
            )}
          >
            {cartItemsCount}
          </span>
        )}
        <span className="font-bold">Cart</span>
        {isCartSidebarOpen && (
          <div className="absolute top-[20px] right-[-16px] rotate-[-90deg] z-10 w-0 h-0 border-l-[7px] border-r-[7px] border-b-[8px] border-transparent border-b-background" />
        )}
      </div>
    </Link>
  );
};
