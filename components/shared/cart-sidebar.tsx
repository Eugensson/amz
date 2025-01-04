import Link from "next/link";
import Image from "next/image";
import { TrashIcon } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button, buttonVariants } from "@/components/ui/button";
import { ProductPrice } from "@/components/shared/product/product-price";

import { cn } from "@/lib/utils";

import useCartStore from "@/hooks/use-cart-store";

import { FREE_SHIPPING_MIN_PRICE } from "@/lib/constants";

export const CartSidebar = () => {
  const {
    cart: { items, itemsPrice },
    updateItem,
    removeItem,
  } = useCartStore();

  return (
    <div className="w-36 overflow-y-auto">
      <div className={`fixed border-l h-full`}>
        <div className="p-2 h-full flex flex-col gap-2 justify-start items-center">
          <div className="text-center space-y-2">
            <div> Subtotal</div>
            <div className="font-bold">
              <ProductPrice price={itemsPrice} plain />
            </div>
            {itemsPrice > FREE_SHIPPING_MIN_PRICE && (
              <div className=" text-center text-xs">
                Your order qualifies for FREE Shipping
              </div>
            )}

            <Link
              className={cn(
                buttonVariants({ variant: "outline" }),
                "rounded-full hover:no-underline w-full"
              )}
              href="/cart"
            >
              Go to Cart
            </Link>
            <Separator className="mt-3" />
          </div>

          <ScrollArea className="flex-1 w-full">
            {items.map((item) => (
              <div key={item.clientId}>
                <div className="my-3">
                  <Link href={`/product/${item.slug}`}>
                    <div className="relative h-24">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="20vw"
                        className="object-contain"
                      />
                    </div>
                  </Link>
                  <div className="text-sm text-center font-bold">
                    <ProductPrice price={item.price} plain />
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Select
                      value={item.quantity.toString()}
                      onValueChange={(value) => {
                        updateItem(item, Number(value));
                      }}
                    >
                      <SelectTrigger className="text-xs w-12 ml-1 h-auto py-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: item.countInStock }).map(
                          (_, i) => (
                            <SelectItem value={(i + 1).toString()} key={i + 1}>
                              {i + 1}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                    <Button
                      variant={"outline"}
                      size={"sm"}
                      onClick={() => {
                        removeItem(item);
                      }}
                    >
                      <TrashIcon size={16} />
                    </Button>
                  </div>
                </div>
                <Separator />
              </div>
            ))}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};