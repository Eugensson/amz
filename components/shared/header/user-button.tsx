import Link from "next/link";
import { ChevronDownIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button, buttonVariants } from "@/components/ui/button";

import { auth } from "@/auth";
import { cn } from "@/lib/utils";
import { SignOut } from "@/lib/actions/user.actions";

export const UserButton = async () => {
  const session = await auth();
  const t = await getTranslations();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="header-button" asChild>
        <div className="flex items-center">
          <div className="flex flex-col text-xs text-left">
            <span>
              {t("Header.Hello")},{" "}
              {session ? session.user.name : t("Header.sign in")}
            </span>
            <span className="font-bold">{t("Header.Account & Orders")}</span>
          </div>
          <ChevronDownIcon />
        </div>
      </DropdownMenuTrigger>
      {session ? (
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {session.user.name}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {session.user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuGroup>
            <Link className="w-full" href="/account">
              <DropdownMenuItem>{t("Header.Your account")}</DropdownMenuItem>
            </Link>
            <Link className="w-full" href="/account/orders">
              <DropdownMenuItem>{t("Header.Your orders")}</DropdownMenuItem>
            </Link>

            {session.user.role === "Admin" && (
              <Link className="w-full" href="/admin/overview">
                <DropdownMenuItem>{t("Header.Admin")}</DropdownMenuItem>
              </Link>
            )}
          </DropdownMenuGroup>
          <DropdownMenuItem className="p-0 mb-1">
            <form action={SignOut} className="w-full">
              <Button
                className="w-full py-4 px-2 h-4 justify-start"
                variant="ghost"
              >
                {t("Header.Sign out")}
              </Button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      ) : (
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link className={cn(buttonVariants(), "w-full")} href="/sign-in">
                {t("Header.Sign in")}
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuLabel className="font-normal">
            {t("Header.New Customer")}?{" "}
            <Link href="/sign-up">{t("Header.Sign up")}</Link>
          </DropdownMenuLabel>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
};
