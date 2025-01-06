"use client";

import { useEffect } from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";

import { useColorStore } from "@/hooks/use-color-store";

export const ColorProvider = ({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) => {
  const { theme } = useTheme();
  const { color, updateCssVariables } = useColorStore(theme);
  useEffect(() => {
    updateCssVariables();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, color]);

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};
