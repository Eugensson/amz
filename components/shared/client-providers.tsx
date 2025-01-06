"use client";

import { Toaster } from "@/components/ui/toaster";
import { CartSidebar } from "@/components/shared/cart-sidebar";
import { ThemeProvider } from "@/components/shared/theme-provider";

import useCartSidebar from "@/hooks/use-cart-sidebar";

export const ClientProviders = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const isCartSidebarOpen = useCartSidebar();

  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      {isCartSidebarOpen ? (
        <div className="flex min-h-screen">
          <div className="flex-1 overflow-hidden">{children}</div>
          <CartSidebar />
        </div>
      ) : (
        <div>{children}</div>
      )}
      <Toaster />
    </ThemeProvider>
  );
};
