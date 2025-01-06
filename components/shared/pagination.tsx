"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";

import { formUrlQuery } from "@/lib/utils";

type PaginationProps = {
  page: number | string;
  totalPages: number;
  urlParamName?: string;
};

export const Pagination = ({
  page,
  totalPages,
  urlParamName,
}: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onClick = (btnType: string) => {
    const pageValue = btnType === "next" ? Number(page) + 1 : Number(page) - 1;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: urlParamName || "page",
      value: pageValue.toString(),
    });

    router.push(newUrl, { scroll: true });
  };
  return (
    <div className="flex items-center gap-2">
      <Button
        size="lg"
        variant="outline"
        className="w-24"
        onClick={() => onClick("prev")}
        disabled={Number(page) <= 1}
      >
        <ChevronLeft /> Previous
      </Button>
      <Button
        size="lg"
        variant="outline"
        className="w-24"
        onClick={() => onClick("next")}
        disabled={Number(page) >= totalPages}
      >
        Next <ChevronRight />
      </Button>
    </div>
  );
};
