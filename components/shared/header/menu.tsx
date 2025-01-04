import Link from "next/link";

import { CartButton } from "@/components/shared/header/cart-button";

export const Menu = () => {
  return (
    <div className="flex justify-end">
      <nav className="flex gap-3 w-full">
        <Link href="/signin" className="flex items-center header-button">
          Hello, Sign in
        </Link>
        <CartButton />
      </nav>
    </div>
  );
};
