"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import { ChevronDownIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { i18n } from "@/i18n-config";
import { Link, usePathname } from "@/i18n/routing";
import useSettingStore from "@/hooks/use-setting-store";
import { setCurrencyOnServer } from "@/lib/actions/setting.actions";

export const LanguageSwitcher = () => {
  const { locales } = i18n;
  const locale = useLocale();
  const pathname = usePathname();

  const {
    setting: { availableCurrencies, currency },
    setCurrency,
  } = useSettingStore();

  const handleCurrencyChange = async (newCurrency: string) => {
    await setCurrencyOnServer(newCurrency);
    setCurrency(newCurrency);
  };

  const currentLocale = locales.find((c) => c.code === locale);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="header-button h-[41px]">
        <div className="flex items-center gap-1">
          {currentLocale && (
            <Image
              src={currentLocale.icon}
              alt={currentLocale.name}
              width={24}
              height={24}
            />
          )}
          <ChevronDownIcon />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Language</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={locale}>
          {locales.map((c) => (
            <DropdownMenuRadioItem key={c.name} value={c.code}>
              <Link
                className="w-full flex items-center gap-1"
                href={pathname}
                locale={c.code}
              >
                <Image src={c.icon} alt={c.name} width={24} height={24} />
                {c.name}
              </Link>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>

        <DropdownMenuSeparator />

        <DropdownMenuLabel>Currency</DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={currency}
          onValueChange={handleCurrencyChange}
        >
          {availableCurrencies.map((c) => (
            <DropdownMenuRadioItem key={c.name} value={c.code}>
              {c.symbol} {c.code}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};