import { SearchIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

import { getSetting } from "@/lib/actions/setting.actions";
import { getAllCategories } from "@/lib/actions/product.actions";

export const Search = async () => {
  const {
    site: { name },
  } = await getSetting();
  const t = await getTranslations();
  const categories = await getAllCategories();

  return (
    <form action="/search" method="GET" className="h-10 flex items-stretch">
      <Select name="category">
        <SelectTrigger className="w-auto h-full dark:border-gray-200 bg-gray-100 text-black border-r  rounded-r-none rounded-l-md rtl:rounded-r-md rtl:rounded-l-none  ">
          <SelectValue placeholder={t("Header.All")} />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectItem value="all">{t("Header.All")}</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        className="flex-1 rounded-none dark:border-gray-200 bg-gray-100 text-black text-base h-full"
        placeholder={t("Header.Search Site", { name })}
        name="q"
        type="search"
      />
      <button
        type="submit"
        className="bg-primary text-primary-foreground text-black rounded-s-none rounded-e-md h-full px-3 py-2 "
      >
        <SearchIcon size={24} />
      </button>
    </form>
  );
};
