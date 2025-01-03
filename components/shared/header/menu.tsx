import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export const Menu = () => {
  return (
    <div className="flex justify-end">
      <nav className="flex gap-3 w-full">
        <Link href="/signin" className="flex items-center header-button">
          Hello, Sign in
        </Link>
        <Link href="/cart" className="header-button">
          <div className="flex items-end">
            <ShoppingCart size={32} />
            Cart
          </div>
        </Link>
      </nav>
    </div>
  );
};
