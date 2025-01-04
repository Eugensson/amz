"use client";

import Link from "next/link";
import { ChevronUp } from "lucide-react";

import { Button } from "@/components/ui/button";

import { APP_NAME } from "@/lib/constants";

export const Footer = () => {
  return (
    <footer className="bg-black text-white underline-link">
      <div className="w-full">
        <Button
          variant="ghost"
          className="bg-gray-800 w-full rounded-none"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ChevronUp size={16} className="mr-2" />
          Back to top
        </Button>
      </div>
      <div className="p-4">
        <div className="flex justify-center gap-3 text-sm">
          <Link href="/page/conditions-of-use">Conditions of Use</Link>
          <Link href="/page/privacy-policy">Privacy Notice</Link>
          <Link href="/page/help">Help</Link>
        </div>
        <div className="flex justify-center text-sm">
          <p> &copy;2025 {APP_NAME} Inc. or its affiliates</p>
        </div>
        <div className="mt-8 flex justify-center text-sm text-gray-400">
          123, Main Street, Anytown, CA, Zip 12345 | +1 (123) 456-7890
        </div>
      </div>
    </footer>
  );
};
