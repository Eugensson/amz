"use client";

import { Toaster } from "@/components/ui/toaster";
import { CartSidebar } from "@/components/shared/cart-sidebar";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { AppInitializer } from "@/components/shared/app-initializer";

import { ClientSetting } from "@/types";

import useCartSidebar from "@/hooks/use-cart-sidebar";

export const ClientProviders = ({
  children,
  setting,
}: {
  children: React.ReactNode;
  setting: ClientSetting;
}) => {
  const visible = useCartSidebar();

  return (
    <AppInitializer setting={setting}>
      <ThemeProvider
        attribute="class"
        defaultTheme={setting.common.defaultTheme.toLocaleLowerCase()}
      >
        {visible ? (
          <div className="flex min-h-screen">
            <div className="flex-1 overflow-hidden">{children}</div>
            <CartSidebar />
          </div>
        ) : (
          <>{children}</>
        )}
        <Toaster />
      </ThemeProvider>
    </AppInitializer>
  );
};
