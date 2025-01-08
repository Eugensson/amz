"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronUp } from "lucide-react";
import { SelectValue } from "@radix-ui/react-select";
import { useLocale, useTranslations } from "next-intl";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import { i18n } from "@/i18n-config";
import { usePathname, useRouter } from "@/i18n/routing";
import useSettingStore from "@/hooks/use-setting-store";

export const Footer = () => {
  const router = useRouter();
  const pathname = usePathname();
  const {
    setting: { site, availableCurrencies, currency },
    setCurrency,
  } = useSettingStore();
  const { locales } = i18n;

  const locale = useLocale();
  const t = useTranslations();

  return (
    <footer className="bg-gray-950 text-white">
      <Button
        variant="ghost"
        className="bg-gray-800 w-full rounded-none"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ChevronUp size={16} className="mr-2" />
        {t("Footer.Back to top")}
      </Button>
      <ul className="container max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6 py-5">
        <li>
          <h3 className="font-bold mb-2">{t("Footer.Get to Know Us")}</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/page/careers" className="link">
                {t("Footer.Careers")}
              </Link>
            </li>
            <li>
              <Link href="/page/blog" className="link">
                {t("Footer.Blog")}
              </Link>
            </li>
            <li>
              <Link href="/page/about-us" className="link">
                {t("Footer.About name", { name: site.name })}
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <h3 className="font-bold mb-2">{t("Footer.Make Money with Us")}</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/page/sell" className="link">
                {t("Footer.Sell products on", { name: site.name })}
              </Link>
            </li>
            <li>
              <Link href="/page/become-affiliate" className="link">
                {t("Footer.Become an Affiliate")}
              </Link>
            </li>
            <li>
              <Link href="/page/advertise" className="link">
                {t("Footer.Advertise Your Products")}
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <h3 className="font-bold mb-2">{t("Footer.Let Us Help You")}</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/page/shipping" className="link">
                {t("Footer.Shipping Rates & Policies")}
              </Link>
            </li>
            <li>
              <Link href="/page/returns-policy" className="link">
                {t("Footer.Returns & Replacements")}
              </Link>
            </li>
            <li>
              <Link href="/page/help" className="link">
                {t("Footer.Help")}
              </Link>
            </li>
          </ul>
        </li>
      </ul>
      <div className="border-t border-gray-800">
        <div className="container py-5 flex flex-wrap items-center gap-5 justify-center">
          <Image
            src="/icons/logo.svg"
            alt={`${site.name} logo`}
            width={40}
            height={40}
            className="aspect-square"
          />
          <Select
            value={locale}
            onValueChange={(value) => {
              router.push(pathname, { locale: value });
            }}
          >
            <SelectTrigger className="w-full max-w-[220px]">
              <SelectValue placeholder={t("Footer.Select a language")} />
            </SelectTrigger>
            <SelectContent>
              {locales.map((lang, index) => (
                <SelectItem key={index} value={lang.code}>
                  <Link
                    className="w-full flex items-center gap-2"
                    href={pathname}
                    locale={lang.code}
                  >
                    <Image
                      src={lang.icon}
                      alt={lang.name}
                      width={20}
                      height={20}
                    />
                    {lang.name}
                  </Link>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={currency}
            onValueChange={(value) => {
              setCurrency(value);
              window.scrollTo(0, 0);
            }}
          >
            <SelectTrigger className="w-full max-w-[220px]">
              <SelectValue placeholder={t("Footer.Select a currency")} />
            </SelectTrigger>
            <SelectContent>
              {availableCurrencies
                .filter((x) => x.code)
                .map((currency, index) => (
                  <SelectItem key={index} value={currency.code}>
                    {currency.name} ({currency.code})
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col justify-center gap-2 text-center text-sm">
          <ul className="flex justify-center items-center gap-5">
            <li>
              <Link href="/page/conditions-of-use" className="link">
                {t("Footer.Conditions of Use")}
              </Link>
            </li>
            <li>
              <Link href="/page/privacy-policy" className="link">
                {t("Footer.Privacy Notice")}
              </Link>
            </li>
            <li>
              <Link href="/page/help" className="link">
                {t("Footer.Help")}
              </Link>
            </li>
          </ul>
          <p className="text-xs">&copy; {site.copyright}</p>
          <p className="text-xs">
            {site.address} | {site.phone}
          </p>
        </div>
      </div>
    </footer>
  );
};
