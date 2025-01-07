import { usePathname } from "next/navigation";

import useCartStore from "@/hooks/use-cart-store";
import useDeviceType from "@/hooks/use-device-type";

import { i18n } from "@/i18n-config";

const locales = i18n.locales
  .filter((locale) => locale.code !== "en-US")
  .map((locale) => locale.code);

const isNotInPaths = (s: string) => {
  const localePattern = `/(?:${locales.join("|")})`;
  const pathsPattern = `^(?:${localePattern})?(?:/$|/cart$|/checkout$|/sign-in$|/sign-up$|/order(?:/.*)?$|/account(?:/.*)?$|/admin(?:/.*)?$)?$`;
  console.log(!new RegExp(pathsPattern).test(s));
  return !new RegExp(pathsPattern).test(s);
};

function useCartSidebar() {
  const {
    cart: { items },
  } = useCartStore();
  const deviceType = useDeviceType();
  const currentPath = usePathname();

  return (
    items.length > 0 && deviceType === "desktop" && isNotInPaths(currentPath)
  );
}

export default useCartSidebar;
