"use client";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export const ActionButton = ({
  caption,
  action,
  className = "w-full",
  variant = "default",
  size = "default",
}: {
  caption: string;
  action: () => Promise<{ success: boolean; message: string }>;
  className?: string;
  variant?: "default" | "outline" | "destructive";
  size?: "default" | "sm" | "lg";
}) => {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      type="button"
      className={cn("rounded-full", className)}
      variant={variant}
      size={size}
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          const res = await action();
          toast({
            variant: res.success ? "default" : "destructive",
            description: res.message,
          });
        })
      }
    >
      {isPending ? "processing..." : caption}
    </Button>
  );
};
