"use client";

import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { ChevronDownIcon, Moon, Sun } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import useIsMounted from "@/hooks/use-is-mounted";
import { useColorStore } from "@/hooks/use-color-store";

export const ThemeSwitcher = () => {
  const isMounted = useIsMounted();
  const t = useTranslations("Header");
  const { theme, setTheme } = useTheme();
  const { availableColors, color, setColor } = useColorStore(theme);

  const changeTheme = (value: string) => {
    setTheme(value);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="header-button h-[41px]">
        {theme === "dark" && isMounted ? (
          <div className="flex items-center gap-1">
            <Moon className="h-4 w-4" /> {t("Dark")} <ChevronDownIcon />
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <Sun className="h-4 w-4" /> {t("Light")} <ChevronDownIcon />
          </div>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Theme</DropdownMenuLabel>

        <DropdownMenuRadioGroup value={theme} onValueChange={changeTheme}>
          <DropdownMenuRadioItem value="dark">
            <Moon className="h-4 w-4 mr-1" /> {t("Dark")}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="light">
            <Sun className="h-4 w-4 mr-1" /> {t("Light")}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>{t("Color")}</DropdownMenuLabel>

        <DropdownMenuRadioGroup
          value={color.name}
          onValueChange={(value) => setColor(value, true)}
        >
          {availableColors.map((c) => (
            <DropdownMenuRadioItem key={c.name} value={c.name}>
              <div
                style={{ backgroundColor: c.name }}
                className="h-4 w-4 mr-1 rounded-full"
              />
              {t(c.name)}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};