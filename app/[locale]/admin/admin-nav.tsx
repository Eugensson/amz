"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const links = [
  {
    title: "Overview",
    href: "/admin/overview",
  },
  {
    title: "Products",
    href: "/admin/products",
  },
  {
    title: "Orders",
    href: "/admin/orders",
  },
  {
    title: "Users",
    href: "/admin/users",
  },
  {
    title: "Pages",
    href: "/admin/web-pages",
  },
  {
    title: "Settings",
    href: "/admin/settings",
  },
];
export const AdminNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();
  const t = useTranslations("Admin");

  return (
    <nav
      className={cn(
        "flex items-center flex-wrap overflow-hidden gap-2 md:gap-4",
        className
      )}
      {...props}
    >
      {links.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "",
            pathname.includes(item.href) ? "" : "text-muted-foreground"
          )}
        >
          {t(item.title)}
        </Link>
      ))}
    </nav>
  );
};