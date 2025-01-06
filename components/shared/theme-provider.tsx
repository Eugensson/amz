"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

import { ColorProvider } from "@/components/shared/color-provider";

export const ThemeProvider = ({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) => {
  return (
    <NextThemesProvider {...props}>
      <ColorProvider>{children}</ColorProvider>
    </NextThemesProvider>
  );
};
