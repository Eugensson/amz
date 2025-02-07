import Link from "next/link";
import Image from "next/image";
import { HelpCircle } from "lucide-react";

const CheckoutLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-4">
      <header className="bg-card mb-4 border-b">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/">
            <Image
              src="/icons/logo.svg"
              alt="logo"
              width={70}
              height={70}
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </Link>
          <div>
            <h1 className="text-3xl">Checkout</h1>
          </div>
          <div>
            <Link href="/page/help">
              <HelpCircle size={20} />
            </Link>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
};

export default CheckoutLayout;
